import React, { Component } from "react";
import { connect } from "react-redux";

import Table from "../components/Calendar";
import { registerDailyWork } from "../actions/dataActions";

class RecordsAggregatedTable extends Component {
  render() {
    return (
      <Table
        daysOfEffort={this.props.daysOfEffort}
        monthlyAmountOfEffort={this.props.monthlyAmountOfEffort}
        handleRegisterDailyWork={this.props.handleRegisterDailyWork}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    daysOfEffort: state.data.daysOfEffort,
    monthlyAmountOfEffort: state.data.monthlyAmountOfEffort
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleRegisterDailyWork: date => {
      dispatch(registerDailyWork(date));
    }
  };
};

export default (RecordsAggregatedTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordsAggregatedTable));
