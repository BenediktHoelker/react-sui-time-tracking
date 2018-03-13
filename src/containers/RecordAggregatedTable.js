import React, { Component } from "react";
import { connect } from "react-redux";

import Table from "../components/Calendar";
import {
  loadRecordsOfMonth,
  registerDailyWork
} from "../actions/recordActions";
import { toggleTravel, toggleLeave } from "../actions/dailyAdditionActions";
import {
  getEffortAggregatedByDate,
  getEffortAggregatedByMonth
} from "../selectors";

class RecordsAggregatedTable extends Component {
  state = { month: "03" };

  selectMonth = (e, { value }) => this.setState({ month: value });

  componentDidMount() {
    this.props.loadRecords(this.state.month);
  }

  render() {
    return <Table {...this.props} selectMonth={this.selectMonth} />;
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
    },
    loadRecords: (month) => {
      dispatch(loadRecordsOfMonth(month));
    }
  };
};

export default (RecordsAggregatedTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordsAggregatedTable));
