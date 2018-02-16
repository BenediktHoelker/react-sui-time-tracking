import React, { Component } from "react";
import { connect } from "react-redux";

import Form from "../components/Form";
import { submitRecord } from "../actions/recordActions";
import { getSubProjectsByProject, getTasksBySubProject } from "../selectors";

class RecordForm extends Component {
  render() {
    return (
      <Form
        activities={this.props.activities}
        activitiesLoading={this.props.activitiesLoading}
        projects={this.props.projects}
        projectsLoading={this.props.projectsLoading}
        subProjects={this.props.subProjects}
        subProjectsLoading={this.props.subProjectsLoading}
        tasks={this.props.tasks}
        tasksLoading={this.props.tasksLoading}
        user={this.props.user}
        newRecord={this.props.newRecord}
        handleSubmit={this.props.handleSubmit}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    activities: state.categorization.activities,
    activitiesLoading: state.categorization.activitiesLoading,
    projects: state.categorization.projects,
    projectsLoading: state.categorization.projectsLoading,
    subProjects: getSubProjectsByProject(state),
    subProjectsLoading: state.categorization.subProjectsLoading,
    tasks: getTasksBySubProject(state),
    tasksLoading: state.categorization.tasksLoading,
    user: state.auth.user,
    newRecord: state.records.newRecord
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit: event => {
      dispatch(submitRecord(event));
    }
  };
};

export default (RecordForm = connect(mapStateToProps, mapDispatchToProps)(
  RecordForm
));
