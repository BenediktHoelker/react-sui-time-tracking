import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider, connect } from "react-redux";

import firebase from "./firebase.js";

import ActionMenu from "./containers/ActionMenu";
import RecordAggregatedTable from "./containers/RecordAggregatedTable";
import RecordForm from "./containers/RecordForm";
import RecordSidebar from "./containers/RecordSidebar";
import RecordTable from "./containers/RecordTable";

import { Message, Sidebar, Segment } from "semantic-ui-react";

import { loadProjects, loadRecords } from "./actions/dataActions";

import { receiveLogin } from "./actions/uiActions";

class Navbar extends Component {
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
    return (
      <Provider store={this.props.store}>
        <Router>
          <Sidebar.Pushable as={Segment}>
            {this.props.user ? <RecordSidebar /> : ""}
            <Sidebar.Pusher>
              <Segment basic loading={this.props.loginIsLoading}>
                <ActionMenu />
                {this.props.user ? (
                  <div>
                    <Route exact path="/create" component={RecordForm} />
                    <Route
                      exact
                      path="/calendar"
                      component={RecordAggregatedTable}
                    />
                    <Route exact path="/" component={RecordTable} />
                  </div>
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
    user: state.ui.user
  };
};

export default (Navbar = connect(mapStateToProps)(Navbar));
