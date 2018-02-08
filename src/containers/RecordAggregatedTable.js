import React, { Component } from "react";
import { connect } from "react-redux";

import Table from "../components/Calendar";
import { registerDailyWork } from "../actions/dataActions";
import {
  getEffortAggregatedByDate,
  getEffortAggregatedByMonth
} from "../selectors";

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
    daysOfEffort: getEffortAggregatedByDate(state),
    monthlyAmountOfEffort: getEffortAggregatedByMonth(state)
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
