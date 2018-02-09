import React, { Component } from "react";
import { connect } from "react-redux";

import Form from "../components/Form";
import { submitRecord, selectProject, editField } from "../actions/dataActions";

class RecordForm extends Component {

  render() {
    return (
      <Form
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
    newRecord: state.data.newRecord
  };
};

const mapDispatchToProps = dispatch => {
  return {
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
