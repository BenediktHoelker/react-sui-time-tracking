import React, { Component } from "react";
import { connect } from "react-redux";

import Sidebar from "./Sidebar";
import { setActiveVMenuItem } from "./actions/uiActions";

class WorkItemSidebar extends Component {
  render() {
    return (
      <Sidebar
        activeItem={this.props.vMenuActiveItem}
        items={this.props.items}
        visible={this.props.sidebarIsVisible}
        handleItemClick={this.props.handleVMenuItemClick}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.data.items,
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
