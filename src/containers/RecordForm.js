import React, { Component } from "react";
import { connect } from "react-redux";

import Form from "../components/Form";
import { submitRecord } from "../actions/recordActions";
import { getSubprojectsByProject, getTasksBySubproject } from "../selectors";

class RecordForm extends Component {
  render() {
    return <Form {...this.props} />;
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
