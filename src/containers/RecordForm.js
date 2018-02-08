import React, { Component } from "react";
import { connect } from "react-redux";

import Form from "../components/Form";
import { setActiveVMenuItem } from "../actions/uiActions";
import { submitRecord, selectProject, editField } from "../actions/dataActions";
import { getNewRecordStartTime } from "../selectors";

class RecordForm extends Component {

  render() {
    return (
      <Form
        nextStartTime={this.props.nextStartTime}
        projects={this.props.projects}
        projectsLoading={this.props.projectsLoading}
        user={this.props.user}
        newRecord={this.props.newRecord}
        handleSubmit={this.props.handleSubmit}
        handleChange={this.props.handleChange}
        handleSelect={this.props.handleSelect}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: state.data.projects,
    projectsLoading: state.ui.projectsLoading,
    user: state.ui.user,
    newRecord: state.data.newRecord,
    nextStartTime: getNewRecordStartTime(state)
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
    handleSelect: (event, { value }) => {
      dispatch(selectProject(event, value));
    }
  };
};

export default (RecordForm = connect(mapStateToProps, mapDispatchToProps)(
  RecordForm
));
