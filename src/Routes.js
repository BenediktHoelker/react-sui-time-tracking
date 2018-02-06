import React from "react";
import { Route } from "react-router-dom";

import RecordForm from "./containers/RecordForm";
import RecordsAggregatedTable from "./containers/RecordsAggregatedTable";
import MyTable from "./Table";
import MyCalendar from "./Calendar";

const Routes = props => (
  <div>
    <Route exact path="/create" component={RecordForm} />
    <Route exact path="/calendar" component={RecordsAggregatedTable} />
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
