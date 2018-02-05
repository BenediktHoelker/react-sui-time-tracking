import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";

import firebase from "./firebase.js";
import MyForm from "./Form";
import MyTable from "./Table";
import MySidebar from "./Sidebar";
import MyCalendar from "./Calendar";

import {
  Dimmer,
  Loader,
  Menu,
  Message,
  Sidebar,
  Segment
} from "semantic-ui-react";

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
    const props = this.props;

    return (
      <Router>
        <Sidebar.Pushable as={Segment}>
          {props.user ? (
            <MySidebar
              visible={props.sidebarIsVisible}
              items={props.items}
              handleItemClick={props.handleVMenuItemClick}
              activeItem={props.vMenuActiveItem}
            />
          ) : (
            ""
          )}
          <Sidebar.Pusher>
            <Segment basic>
              <Menu stackable>
                <Menu.Item
                  icon="sidebar"
                  onClick={props.toggleVisibility}
                />
                <Menu.Item
                  icon="external"
                  onClick={props.handleVMenuItemClick.bind(this, "")}
                />
                <Menu.Item header as="h3">
                  Arbeit
                </Menu.Item>
                <Menu.Item
                  as={Link}
                  to="/create"
                  name="erfassung"
                  active={props.hMenuActiveItem === "erfassung"}
                  onClick={props.handleHMenuItemClick}
                />
                <Menu.Item
                  as={Link}
                  to="/"
                  name="auswertung"
                  active={props.hMenuActiveItem === "auswertung"}
                  onClick={props.handleHMenuItemClick}
                />
                <Menu.Item
                  as={Link}
                  to="/calendar"
                  name="tage"
                  active={props.hMenuActiveItem === "tage"}
                  onClick={props.handleHMenuItemClick}
                />
                {props.user ? (
                  <Menu.Item onClick={props.logout} position="right">
                    {props.user.displayName}
                    - Logout
                  </Menu.Item>
                ) : (
                  <Menu.Item onClick={props.login} position="right">
                    Login
                  </Menu.Item>
                )}
              </Menu>
              {props.user ? (
                <div>
                  <Route
                    exact
                    path="/create"
                    render={routeProps => (
                      <MyForm
                        {...routeProps}
                        {...{
                          projects: props.projects,
                          projectsLoading: props.projectsLoading,
                          handleSubmit: props.handleSubmit,
                          handleChange: props.editField,
                          handleSelect: props.selectProject,
                          nextStartTime: props.nextStartTime,
                          user: props.user,
                          workItem: props.workItem
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
                          daysOfEffort: props.daysOfEffort,
                          monthlyAmountOfEffort: props
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
                          handleRemove: props.handleRemove,
                          items: props.items ? props.items : [],
                          user: props.user
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
                  <Dimmer active={props.loginIsLoading}>
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
