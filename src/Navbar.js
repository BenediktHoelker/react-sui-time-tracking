import React, { Component } from "react";
import { Menu, Message, Sidebar, Segment } from "semantic-ui-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import MyForm from "./Form";
import MyTable from "./Table";
import MySidebar from "./Sidebar";
import MyCalendar from "./Calendar";
import firebase from "./firebase.js";

import { connect } from "react-redux";
import {
  handleRemoveItem,
  loadProjects,
  requestWorkItems
} from "./actions/dataActions";

import {
  getUser,
  handleVMenuItemClick,
  handleHMenuItemClick,
  triggerLogin,
  triggerLogout,
  toggleNavbar,
  receiveLogin
} from "./actions/uiActions";

class SidebarLeftOverlay extends Component {
  componentDidMount() {
    const store = this.props.store;

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        store.dispatch(receiveLogin(user));
        store.dispatch(requestWorkItems(user));
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
              visible={this.props.visible}
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
                          companies: this.props.projects,
                          companiesLoading: this.props.projectsLoading,
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
                    render={routeProps => <MyCalendar {...routeProps} {...{
                      daysOfEffort: this.props.daysOfEffort
                    }}/>}
                  />
                  <Route
                    exact
                    path="/"
                    render={routeProps => (
                      <MyTable
                        {...routeProps}
                        {...{
                          items: this.props.items ? this.props.items : [],
                          handleRemove: this.props.handleRemove,
                          user: this.props.user
                        }}
                      />
                    )}
                  />
                </div>
              ) : (
                <Message>
                  <Message.Header>Nicht eingeloggt</Message.Header>
                  <p>Sie müssen eingeloggt sein, um die Anwendung zu nutzen</p>
                </Message>
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
    hMenuActiveItem: state.ui.hMenuActiveItem,
    projects: state.data.projects,
    projectsLoading: state.data.projectsLoading,
    user: state.ui.user,
    visible: state.ui.isNavbarVisible,
    vMenuActiveItem: state.ui.vMenuActiveItem,
    workItem: state.data.workItem
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleVisibility: () => {
      dispatch(toggleNavbar());
    },
    login: () => {
      dispatch(triggerLogin());
    },
    logout: () => {
      dispatch(triggerLogout());
    },
    handleVMenuItemClick: id => {
      dispatch(handleVMenuItemClick(id));
    },
    handleHMenuItemClick: (e, { name }) => {
      dispatch(handleHMenuItemClick(name));
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
