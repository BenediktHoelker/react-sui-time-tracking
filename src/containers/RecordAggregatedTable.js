import React, { Component } from "react";
import { connect } from "react-redux";

import Table from "../components/Calendar";
import { registerDailyWork } from "../actions/recordActions";
import { toggleTravel } from "../actions/travelActions";
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
        handleRegisterDailyWork={this.props.handleRegisterDailyWork}
        handleToggleTravel={this.props.handleToggleTravel}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    daysOfEffort: getEffortAggregatedByDate(state),
    monthlyAmountOfEffort: getEffortAggregatedByMonth(state),
    travelDates: state.travels.allIds.map(id => {
      return state.travels.byId[id].travel ? id : undefined;
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
    }
  };
};

export default (RecordsAggregatedTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordsAggregatedTable));
