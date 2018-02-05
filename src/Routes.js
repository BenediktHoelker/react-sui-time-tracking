import React from "react";
import { Route } from "react-router-dom";

import MyForm from "./Form";
import MyTable from "./Table";
import MyCalendar from "./Calendar";

const Routes = props => (
  <div>
    <Route
      exact
      path="/create"
      render={routeProps => (
        <MyForm
          {...routeProps}
          {...{
            projects: props.projects,
            projectsLoading: props.projectsLoading,
            handleSubmit: props.handleSubmit,
            handleChange: props.editField,
            handleSelect: props.selectProject,
            nextStartTime: props.nextStartTime,
            user: props.user,
            workItem: props.workItem
          }}
        />
      )}
    />
    <Route
      exact
      path="/calendar"
      render={routeProps => (
        <MyCalendar
          {...routeProps}
          {...{
            daysOfEffort: props.daysOfEffort,
            monthlyAmountOfEffort: props.monthlyAmountOfEffort
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
            items: props.items ? props.items : [],
            user: props.user
          }}
        />
      )}
    />
  </div>
);

export default Routes;
