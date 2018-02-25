import React, { Component } from "react";
import { connect } from "react-redux";

import Sidebar from "../components/Sidebar";
import { sidebarSetActiveItem } from "../actions/uiActions";

class RecordSidebar extends Component {
  render() {
    return (
      <Sidebar
        activeItem={this.props.sidebarActiveItem}
        records={this.props.records}
        user={this.props.user}
        visible={this.props.sidebarIsVisible}
        handleItemClick={this.props.handleSidebarItemClick}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    records: state.records.collection,
    sidebarIsVisible: state.ui.sidebarIsVisible,
    sidebarActiveItem: state.ui.sidebarActiveItem,
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleSidebarItemClick: (event, { id }) => {
      dispatch(sidebarSetActiveItem(id));
    }
  };
};

export default (RecordSidebar = connect(mapStateToProps, mapDispatchToProps)(
  RecordSidebar
));
