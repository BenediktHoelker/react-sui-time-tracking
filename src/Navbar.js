import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider, connect } from "react-redux";

import firebase from "./firebase.js";

import ActionMenu from "./containers/ActionMenu";
import WorkItemSidebar from "./containers/RecordSidebar";
import MyRoutes from "./Routes";

import { Message, Sidebar, Segment } from "semantic-ui-react";

import {
  editField,
  handleRemoveRecord,
  loadProjects,
  loadRecords,
  submitRecord,
  selectProject,
  registerDailyWork
} from "./actions/dataActions";

import {
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
        store.dispatch(loadRecords());
        store.dispatch(loadProjects());
      }
    });
  }

  render() {
    const props = this.props;

    return (
      <Provider store={this.props.store}>
        <Router>
          <Sidebar.Pushable as={Segment}>
            {props.user ? <WorkItemSidebar /> : ""}
            <Sidebar.Pusher>
              <Segment basic loading={props.loginIsLoading}>
                <ActionMenu />
                {props.user ? (
                  <MyRoutes
                    daysOfEffort={props.daysOfEffort}
                    records={props.records}
                    projects={props.projects}
                    projectsLoading={props.projectsLoading}
                    handleSubmit={props.handleSubmit}
                    handleChange={props.editField}
                    handleSelect={props.selectProject}
                    handleRemove={props.handleRemove}
                    handleRegisterDailyWork={props.handleRegisterDailyWork}
                    nextStartTime={props.nextStartTime}
                    user={props.user}
                    workItem={props.workItem}
                  />
                ) : (
                  <div>
                    <Message>
                      <Message.Header>Nicht eingeloggt</Message.Header>
                      <p>
                        Sie müssen eingeloggt sein, um die Anwendung zu nutzen
                      </p>
                    </Message>
                  </div>
                )}
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Router>
      </Provider>
    );
  }
}

const mapStateToProps = state => {
  return {
    daysOfEffort: state.data.daysOfEffort,
    records: state.data.records,
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
      dispatch(submitRecord(event));
    },
    handleVMenuItemClick: id => {
      dispatch(setActiveVMenuItem(id));
    },
    handleHMenuItemClick: (e, { name }) => {
      dispatch(setActiveHMenuItem(name));
    },
    handleRemove: id => {
      dispatch(handleRemoveRecord(id));
    },
    handleRegisterDailyWork: date => {
      dispatch(registerDailyWork(date));
    }
  };
};

export default (SidebarLeftOverlay = connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarLeftOverlay));
