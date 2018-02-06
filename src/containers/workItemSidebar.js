import React, { Component } from "react";
import { connect } from "react-redux";

import Sidebar from "../Sidebar";
import { setActiveVMenuItem } from "../actions/uiActions";

class WorkItemSidebar extends Component {
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
    handleVMenuItemClick: id => {
      dispatch(setActiveVMenuItem(id));
    }
  };
};

export default (WorkItemSidebar = connect(mapStateToProps, mapDispatchToProps)(
  WorkItemSidebar
));
