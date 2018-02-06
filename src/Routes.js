import React from "react";
import { Route } from "react-router-dom";

import RecordForm from "./containers/RecordForm";
import MyTable from "./Table";
import MyCalendar from "./Calendar";

const Routes = props => (
  <div>
    <Route exact path="/create" render={routeProps => <RecordForm />} />
    <Route
      exact
      path="/calendar"
      render={routeProps => (
        <MyCalendar
          {...routeProps}
          {...{
            daysOfEffort: props.daysOfEffort,
            monthlyAmountOfEffort: props.monthlyAmountOfEffort,
            handleRegisterDailyWork: props.handleRegisterDailyWork
          }}
        />
      )}
    />
    <Route
      exact
      path="/"
      render={routeProps => (
        <MyTable
          {...routeProps}
          {...{
            handleRemove: props.handleRemove,
            records: props.records,
            user: props.user
          }}
        />
      )}
    />
  </div>
);

export default Routes;
