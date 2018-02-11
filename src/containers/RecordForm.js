import React, { Component } from "react";
import { connect } from "react-redux";

import Form from "../components/Form";
import { submitRecord, editField } from "../actions/recordActions";
import { getSubProjectsByProject } from "../selectors";

class RecordForm extends Component {
  render() {
    return (
      <Form
        projects={this.props.projects}
        projectsLoading={this.props.projectsLoading}
        subProjects={this.props.subProjects}
        subProjectsLoading={this.props.subProjectsLoading}
        user={this.props.user}
        newRecord={this.props.newRecord}
        handleSubmit={this.props.handleSubmit}
        handleChange={this.props.handleChange}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: state.categorization.projects,
    projectsLoading: state.categorization.projectsLoading,
    subProjects: getSubProjectsByProject(state),
    subProjectsLoading: state.categorization.subProjectsLoading,
    user: state.auth.user,
    newRecord: state.records.newRecord
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit: event => {
      dispatch(submitRecord(event));
    },
    handleChange: (event, { name, value }) => {
      dispatch(editField(event, name, value));
    }
  };
};

export default (RecordForm = connect(mapStateToProps, mapDispatchToProps)(
  RecordForm
));
