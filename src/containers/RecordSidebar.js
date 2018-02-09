import React, { Component } from "react";
import { connect } from "react-redux";

import Sidebar from "../components/Sidebar";
import { setActiveVMenuItem } from "../actions/uiActions";

class RecordSidebar extends Component {
  render() {
    return (
      <Sidebar
        activeItem={this.props.vMenuActiveItem}
        records={this.props.records}
        visible={this.props.sidebarIsVisible}
        handleItemClick={this.props.handleVMenuItemClick}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    records: state.data.records,
    sidebarIsVisible: state.ui.sidebarIsVisible,
    vMenuActiveItem: state.ui.vMenuActiveItem
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleVMenuItemClick: (event, { id }) => {
      dispatch(setActiveVMenuItem(id));
    }
  };
};

export default (RecordSidebar = connect(mapStateToProps, mapDispatchToProps)(
  RecordSidebar
));
