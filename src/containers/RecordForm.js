import React, { Component } from "react";
import { connect } from "react-redux";

import Form from "../components/Form";
import { submitRecord } from "../actions/recordActions";
import { getSubprojectsByProject, getTasksBySubproject } from "../selectors";

class RecordForm extends Component {
  render() {
    return (
      <Form
        activities={this.props.activities}
        activitiesLoading={this.props.activitiesLoading}
        projects={this.props.projects}
        projectsLoading={this.props.projectsLoading}
        subprojects={this.props.subprojects}
        subprojectsLoading={this.props.subprojectsLoading}
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
    activities: state.categorization.activities.allIds.map(id => {
      return state.categorization.activities.byId[id];
    }),
    activitiesLoading: state.categorization.activitiesLoading,
    projects: state.categorization.projects.allIds.map(id => {
      return state.categorization.projects.byId[id];
    }),
    projectsLoading: state.categorization.projectsLoading,
    subprojects: getSubprojectsByProject(state),
    subprojectsLoading: state.categorization.subprojectsLoading,
    tasks: getTasksBySubproject(state),
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
