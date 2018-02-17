import React, { Component } from "react";
import { connect } from "react-redux";

import Table from "../components/Calendar";
import { registerDailyWork } from "../actions/recordActions";
import { toggleTravel, toggleLeave } from "../actions/dailyAdditionActions";
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
        travelDates={this.props.travelDates}
        leaveDates={this.props.leaveDates}
        handleRegisterDailyWork={this.props.handleRegisterDailyWork}
        handleToggleLeave={this.props.handleToggleLeave}
        handleToggleTravel={this.props.handleToggleTravel}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    daysOfEffort: getEffortAggregatedByDate(state),
    leaveDates: state.dailyAdditions.allIds.map(id => {
      return state.dailyAdditions.byId[id].leave ? id : undefined;
    }),
    monthlyAmountOfEffort: getEffortAggregatedByMonth(state),
    travelDates: state.dailyAdditions.allIds.map(id => {
      return state.dailyAdditions.byId[id].travel ? id : undefined;
    })
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleRegisterDailyWork: date => {
      dispatch(registerDailyWork(date));
    },
    handleToggleTravel: date => {
      dispatch(toggleTravel(date));
    },
    handleToggleLeave: date => {
      dispatch(toggleLeave(date));
    }
  };
};

export default (RecordsAggregatedTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordsAggregatedTable));
