import React, { Component } from "react";
import { connect } from "react-redux";

import Menu from "../Menu";
import { login, logout, setActiveVMenuItem, toggleNavbar } from "../actions/uiActions";

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
    activeItem: state.ui.hMenuActiveItem,
    records: state.data.records,
    user: state.ui.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleItemClick: id => {
      dispatch(setActiveVMenuItem(id));
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
