import React, { Component } from "react";
import { connect } from "react-redux";

import Menu from "../components/Menu";
import { login, logout } from "../actions/authActions";
import { menuSetActiveItem, toggleNavbar } from "../actions/uiActions";

class ActionMenu extends Component {
  render() {
    return <Menu {...this.props} />;
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
