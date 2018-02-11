import React, { Component } from "react";
import { connect } from "react-redux";

import Menu from "../components/Menu";
import { login, logout } from "../actions/authActions";
import { menuSetActiveItem, toggleNavbar } from "../actions/uiActions";

class ActionMenu extends Component {
  render() {
    return (
      <Menu
        activeItem={this.props.activeItem}
        records={this.props.records}
        user={this.props.user}
        logout={this.props.logout}
        login={this.props.login}
        handleItemClick={this.props.handleItemClick}
        handleSidebarIconClick={this.props.handleSidebarIconClick}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    activeItem: state.ui.menuActiveItem,
    records: state.records.collection,
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleItemClick: (event, { name }) => {
      dispatch(menuSetActiveItem(name));
    },
    handleSidebarIconClick: () => {
      dispatch(toggleNavbar());
    },
    login: () => {
      dispatch(login());
    },
    logout: () => {
      dispatch(logout());
    }
  };
};

export default (ActionMenu = connect(mapStateToProps, mapDispatchToProps)(
  ActionMenu
));
