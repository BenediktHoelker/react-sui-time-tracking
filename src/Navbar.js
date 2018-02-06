import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider, connect } from "react-redux";

import firebase from "./firebase.js";

import ActionMenu from "./containers/ActionMenu";
import RecordSidebar from "./containers/RecordSidebar";
import MyRoutes from "./Routes";

import { Message, Sidebar, Segment } from "semantic-ui-react";

import {
  loadProjects,
  loadRecords,
  registerDailyWork,
  removeRecord,
  submitRecord
} from "./actions/dataActions";

import {
  receiveLogin,
  setActiveVMenuItem,
  setActiveHMenuItem
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
            {props.user ? <RecordSidebar /> : ""}
            <Sidebar.Pusher>
              <Segment basic loading={props.loginIsLoading}>
                <ActionMenu />
                {props.user ? (
                  <MyRoutes
                    daysOfEffort={props.daysOfEffort}
                    nextStartTime={props.nextStartTime}
                    projects={props.projects}
                    projectsLoading={props.projectsLoading}
                    records={props.records}
                    user={props.user}
                    workItem={props.workItem}
                    handleSubmit={props.handleSubmit}
                    handleChange={props.editField}
                    handleSelect={props.selectProject}
                    handleRemove={props.handleRemove}
                    handleRegisterDailyWork={props.handleRegisterDailyWork}
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
    projects: state.data.projects,
    projectsLoading: state.data.projectsLoading,
    user: state.ui.user,
    workItem: state.data.workItem
  };
};

const mapDispatchToProps = dispatch => {
  return {
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
      dispatch(removeRecord(id));
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
