import React, { Component } from "react";
import { connect } from "react-redux";

import Form from "../components/Form";
import { submitRecord } from "../actions/recordActions";
import {
  getSubprojectsByProject,
  getSelectedProject,
  getTasksBySubproject
} from "../selectors";

class RecordForm extends Component {
  render() {
    return (
      <Form
        activities={this.props.activities}
        activitiesLoading={this.props.activitiesLoading}
        projectIds={this.props.projectIds}
        projectsById={this.props.projectsById}
        projectsLoading={this.props.projectsLoading}
        subprojectIds={this.props.subprojectIds}
        subprojectsById={this.props.subprojectsById}
        subprojectsLoading={this.props.subprojectsLoading}
        taskIds={this.props.taskIds}
        tasksById={this.props.tasksById}
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
    projectIds: state.categorization.projects.allIds,
    projectsById: state.categorization.projects.byId,
    projectsLoading: state.categorization.projectsLoading,
    subprojectIds: getSubprojectsByProject(state),
    subprojectsById: state.categorization.subprojects.byId,
    subprojectsLoading: state.categorization.subprojectsLoading,
    taskIds: getTasksBySubproject(state),
    tasksById: state.categorization.tasks.byId,
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
