import React, { Component } from "react";
import {
  Dimmer,
  Loader,
  Menu,
  Message,
  Sidebar,
  Segment
} from "semantic-ui-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import MyForm from "./Form";
import MyTable from "./Table";
import MySidebar from "./Sidebar";
import MyCalendar from "./Calendar";
import firebase from "./firebase.js";

import { connect } from "react-redux";
import {
  editField,
  handleRemoveItem,
  loadProjects,
  loadItems,
  submitItem,
  selectProject
} from "./actions/dataActions";

import {
  getUser,
  setActiveVMenuItem,
  setActiveHMenuItem,
  login,
  logout,
  toggleNavbar,
  receiveLogin
} from "./actions/uiActions";

class SidebarLeftOverlay extends Component {
  componentDidMount() {
    const store = this.props.store;

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        store.dispatch(receiveLogin(user));
        store.dispatch(loadItems());
        store.dispatch(loadProjects());
      }
    });

    store.dispatch(getUser());
  }

  render() {
    return (
      <Router>
        <Sidebar.Pushable as={Segment}>
          {this.props.user ? (
            <MySidebar
              visible={this.props.sidebarIsVisible}
              items={this.props.items}
              handleItemClick={this.props.handleVMenuItemClick}
              activeItem={this.props.vMenuActiveItem}
            />
          ) : (
            ""
          )}
          <Sidebar.Pusher>
            <Segment basic>
              <Menu stackable>
                <Menu.Item
                  icon="sidebar"
                  onClick={this.props.toggleVisibility}
                />
                <Menu.Item
                  icon="external"
                  onClick={this.props.handleVMenuItemClick.bind(this, "")}
                />
                <Menu.Item header as="h3">
                  Arbeit
                </Menu.Item>
                <Menu.Item
                  as={Link}
                  to="/create"
                  name="erfassung"
                  active={this.props.hMenuActiveItem === "erfassung"}
                  onClick={this.props.handleHMenuItemClick}
                />
                <Menu.Item
                  as={Link}
                  to="/"
                  name="auswertung"
                  active={this.props.hMenuActiveItem === "auswertung"}
                  onClick={this.props.handleHMenuItemClick}
                />
                <Menu.Item
                  as={Link}
                  to="/calendar"
                  name="tage"
                  active={this.props.hMenuActiveItem === "tage"}
                  onClick={this.props.handleHMenuItemClick}
                />
                {this.props.user ? (
                  <Menu.Item onClick={this.props.logout} position="right">
                    {this.props.user.displayName}
                    - Logout
                  </Menu.Item>
                ) : (
                  <Menu.Item onClick={this.props.login} position="right">
                    Login
                  </Menu.Item>
                )}
              </Menu>
              {this.props.user ? (
                <div>
                  <Route
                    exact
                    path="/create"
                    render={routeProps => (
                      <MyForm
                        {...routeProps}
                        {...{
                          projects: this.props.projects,
                          projectsLoading: this.props.projectsLoading,
                          handleSubmit: this.props.handleSubmit,
                          handleChange: this.props.editField,
                          handleSelect: this.props.selectProject,
                          nextStartTime: this.props.nextStartTime,
                          user: this.props.user,
                          workItem: this.props.workItem
                        }}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/calendar"
                    render={routeProps => (
                      <MyCalendar
                        {...routeProps}
                        {...{
                          daysOfEffort: this.props.daysOfEffort,
                          monthlyAmountOfEffort: this.props
                            .monthlyAmountOfEffort
                        }}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/"
                    render={routeProps => (
                      <MyTable
                        {...routeProps}
                        {...{
                          handleRemove: this.props.handleRemove,
                          items: this.props.items ? this.props.items : [],
                          user: this.props.user
                        }}
                      />
                    )}
                  />
                </div>
              ) : (
                <div>
                  <Message>
                    <Message.Header>Nicht eingeloggt</Message.Header>
                    <p>
                      Sie müssen eingeloggt sein, um die Anwendung zu nutzen
                    </p>
                  </Message>
                  <Dimmer active={this.props.loginIsLoading}>
                    <Loader />
                  </Dimmer>
                </div>
              )}
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    daysOfEffort: state.data.daysOfEffort,
    items: state.data.items,
    loginIsLoading: state.ui.loginIsLoading,
    monthlyAmountOfEffort: state.data.monthlyAmountOfEffort,
    projects: state.data.projects,
    projectsLoading: state.data.projectsLoading,
    user: state.ui.user,
    sidebarIsVisible: state.ui.sidebarIsVisible,
    hMenuActiveItem: state.ui.hMenuActiveItem,
    vMenuActiveItem: state.ui.vMenuActiveItem,
    workItem: state.data.workItem
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editField: event => {
      dispatch(editField(event));
    },
    selectProject: (event, {value}) => {
      dispatch(selectProject(event, value));
    },
    toggleVisibility: () => {
      dispatch(toggleNavbar());
    },
    login: () => {
      dispatch(login());
    },
    logout: () => {
      dispatch(logout());
    },
    handleSubmit: event => {
      dispatch(submitItem(event));
    },
    handleVMenuItemClick: id => {
      dispatch(setActiveVMenuItem(id));
    },
    handleHMenuItemClick: (e, { name }) => {
      dispatch(setActiveHMenuItem(name));
    },
    handleRemove: id => {
      dispatch(handleRemoveItem(id));
    }
  };
};

export default (SidebarLeftOverlay = connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarLeftOverlay));
