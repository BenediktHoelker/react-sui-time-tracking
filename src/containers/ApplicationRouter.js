import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import ActionMenu from "./ActionMenu";
import RecordAggregatedTable from "./RecordAggregatedTable";
import RecordForm from "./RecordForm";
import RecordSidebar from "./RecordSidebar";
import RecordTable from "./RecordTable";

import { Message, Sidebar, Segment } from "semantic-ui-react";

class ApplicationRouter extends Component {
  render() {
    return (
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
                  {/* TODO: Add NoRouteFound component */}
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
    );
  }
}

const mapStateToProps = state => {
  return {
    loginIsLoading: state.auth.loginIsLoading,
    user: state.auth.user
  };
};

export default (ApplicationRouter = connect(mapStateToProps)(
  ApplicationRouter
));
