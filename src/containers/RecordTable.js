import React, { Component } from "react";
import { connect } from "react-redux";

import Table from "../components/Table";
import { removeRecord } from "../actions/recordActions";

class RecordTable extends Component {
  render() {
    return (
      <Table
        {...{
          handleRemove: this.props.handleRemove,
          records: this.props.records,
          user: this.props.user
        }}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    records: state.records.collection,
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleRemove: id => {
      dispatch(removeRecord(id));
    }
  };
};

export default (RecordTable = connect(mapStateToProps, mapDispatchToProps)(
  RecordTable
));
