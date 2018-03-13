import React, { Component } from "react";
import { connect } from "react-redux";

import Table from "../components/Table";
import { removeRecord } from "../actions/recordActions";
import { enterSearchTerm, selectSearchScope } from "../actions/uiActions";
import { getFilteredRecords } from "../selectors";

class RecordTable extends Component {
  render() {
    return <Table {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    records: getFilteredRecords(state).map(record => {
      return {
        ...record,
        project: state.categorization.projects.byId[record.project]
          ? state.categorization.projects.byId[record.project].name
          : record.project,
        subproject: state.categorization.subprojects.byId[record.subproject]
          ? state.categorization.subprojects.byId[record.subproject].name
          : record.subproject,
        task: state.categorization.tasks.byId[record.task]
          ? state.categorization.tasks.byId[record.task].name
          : record.task
      };
    }),
    searchTerm: state.ui.searchTerm,
    searchScope: state.ui.searchScope,
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleRemove: id => {
      dispatch(removeRecord(id));
    },
    handleEnterSearchTerm: (event, { value }) => {
      event.preventDefault();
      dispatch(enterSearchTerm(value));
    },
    handleSelectSearchScope: (event, { value }) => {
      event.preventDefault();
      dispatch(selectSearchScope(value));
    }
  };
};

export default (RecordTable = connect(mapStateToProps, mapDispatchToProps)(
  RecordTable
));
