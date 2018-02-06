import React, { Component } from "react";
import { connect } from "react-redux";

import Form from "../Form";
import { setActiveVMenuItem} from "../actions/uiActions";
import { submitRecord, selectProject, editField  } from "../actions/dataActions";

class RecordForm extends Component {
  render() {
    return (
      <Form
        nextStartTime={this.props.nextStartTime}
        projects={this.props.projects}
        projectsLoading={this.props.projectsLoading}
        user={this.props.user}
        workItem={this.props.workItem}
        handleSubmit={this.props.handleSubmit}
        handleChange={this.props.handleChange}
        handleSelect={this.props.handleSelect}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    nextStartTime: state.ui.nextStartTime,
    projects: state.data.projects,
    projectsLoading: state.ui.projectsLoading,
    user: state.ui.user,
    workItem: state.data.workItem
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleVMenuItemClick: id => {
      dispatch(setActiveVMenuItem(id));
    },
    handleSubmit: event => {
      dispatch(submitRecord(event));
    },
    handleChange: event => {
      dispatch(editField(event));
    },
    handleSelect: event => {
      dispatch(selectProject(event));
    },
  };
};

export default (RecordForm = connect(mapStateToProps, mapDispatchToProps)(
  RecordForm
));
