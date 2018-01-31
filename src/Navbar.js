import React, { Component } from "react";
import {
  Menu,
  Message,
  Sidebar,
  Segment
} from "semantic-ui-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import MyForm from "./Form";
import MyTable from "./Table";
import MySidebar from "./Sidebar";
import firebase from "./firebase.js";

import { connect } from "react-redux";
import {
  getUser,
  handleVMenuItemClick,
  handleHMenuItemClick,
  loadProjects,
  triggerLogin,
  triggerLogout,
  toggleNavbar,
  requestWorkItems
} from "./actions/uiActions";

class SidebarLeftOverlay extends Component {
  componentDidMount() {
    const store = this.props.store;
    store.dispatch(getUser())
    .then(result => {
      return Promise.resolve(store.dispatch(requestWorkItems(result.user)));
    }).then(() => 
      store.dispatch(loadProjects())
    );
  }

  handleRemove = itemId => {
    const itemsRef = firebase
      .database()
      .ref("/items/" + this.props.user.uid + "/" + itemId);
    itemsRef.remove();
  };

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
                  onClick={this.props.toggleVisibility}
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
                    path="/"
                    render={routeProps => (
                      <MyTable
                        {...routeProps}
                        {...{
                          items: this.props.items ? this.props.items : [],
                          handleRemove: this.handleRemove,
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
    items: state.items,
    hMenuActiveItem: state.hMenuActiveItem,
    projects: state.projects,
    projectsLoading: state.projectsLoading,
    user: state.user,
    visible: state.isNavbarVisible,
    vMenuActiveItem: state.vMenuActiveItem,
    workItem: state.workItem
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
    handleVMenuItemClick: Id => {
      dispatch(handleVMenuItemClick(Id));
    },
    handleHMenuItemClick: (e, { name }) => {
      dispatch(handleHMenuItemClick(name));
    }
  };
};

export default (SidebarLeftOverlay = connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarLeftOverlay));
