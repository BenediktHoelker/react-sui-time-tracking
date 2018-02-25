import React, { Component } from "react";
import { connect } from "react-redux";

import Table from "../components/Table";
import { removeRecord } from "../actions/recordActions";
import { enterSearchTerm, selectSearchScope } from "../actions/uiActions";
import { getFilteredRecords } from "../selectors";

class RecordTable extends Component {
  render() {
    return (
      <Table
        {...{
          handleRemove: this.props.handleRemove,
          handleEnterSearchTerm: this.props.handleEnterSearchTerm,
          handleSelectSearchScope: this.props.handleSelectSearchScope,
          searchTerm: this.props.searchTerm,
          records: this.props.filteredRecords,
          user: this.props.user
        }}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    filteredRecords: getFilteredRecords(state),
    searchTerm: state.ui.searchTerm,
    searchScope: state.ui.searchScope,
    records: state.records.collection,
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
