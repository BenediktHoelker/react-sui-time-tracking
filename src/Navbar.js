import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import firebase from "./firebase.js";
import MyForm from "./Form";
import MyMenu from "./HorizontalMenu";
import MyTable from "./Table";
import MySidebar from "./Sidebar";
import MyCalendar from "./Calendar";

import {
  Dimmer,
  Loader,
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
              <MyMenu
                hMenuActiveItem={props.hMenuActiveItem}
                user={props.user}
                handleHMenuItemClick={props.handleHMenuItemClick}
                login={props.login}
                toggleVisibility={props.toggleVisibility}
              />
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
                          monthlyAmountOfEffort: props.monthlyAmountOfEffort
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
    selectProject: (event, { value }) => {
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
