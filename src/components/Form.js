import React from "react";
import { connect } from "react-redux";
import { Form, Header, Segment } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { InputField, SelectField } from "react-semantic-redux-form";

const timeString = string => {
  const timeRegex = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/;
  const isTimeString = timeRegex.test(string);
  return !isTimeString ? "Falsches Format" : undefined;
};

const dateString = string => {
  const dateRegex = /^\d{2}[./-]\d{2}[./-]\d{4}$/;
  const isDateString = dateRegex.test(string);
  return !isDateString ? "Falsches Format" : undefined;
};

let NewRecordForm = props => (
  <div>
    <Header as="h4" attached="top" block>
      Tätigkeiten erfassen
    </Header>
    <Segment attached>
      <Form onSubmit={props.handleSubmit}>
        <Form.Group widths="equal">
          <Field
            component={SelectField}
            label="Projekt"
            name="project"
            options={props.projectIds.map(projectId => ({
              key: projectId,
              value: projectId,
              text: props.projectsById[projectId].name
            }))}
            loading={props.projectsLoading}
          />
          <Field
            component={SelectField}
            label="Teilprojekt"
            name="subproject"
            options={props.subprojectIds.map(subprojectId => ({
              key: subprojectId,
              value: subprojectId,
              text: props.subprojectsById[subprojectId].name
            }))}
            loading={props.subprojectsLoading}
          />
          <Field
            component={SelectField}
            label="Arbeitspaket"
            name="task"
            options={props.taskIds.map(taskId => ({
              key: taskId,
              value: taskId,
              text: props.tasksById[taskId].name
            }))}
            loading={props.tasksLoading}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Field
            component={SelectField}
            label="Tätigkeit"
            name="activity"
            options={props.activities.map(activity => ({
              key: activity.name,
              value: activity.name,
              text: activity.name
            }))}
            loading={props.tasksLoading}
          />
          <Field
            component={InputField}
            label="Beschreibung"
            name="description"
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Field
            component={InputField}
            label="Datum"
            name="date"
            validate={[dateString]}
          />
          <Field
            component={InputField}
            label="Beginn"
            name="timeStart"
            validate={[timeString]}
          />
          <Field
            component={InputField}
            label="Ende"
            name="timeEnd"
            validate={[timeString]}
          />
        </Form.Group>
        <Form.Button>Abschicken</Form.Button>
      </Form>
    </Segment>
  </div>
);

//export default NewRecordForm;

NewRecordForm = reduxForm({
  enableReinitialize: true, // reinitialization after dropdown selection for all dependent dropdowns
  keepDirtyOnReinitialize: true, // to keep all user selections
  form: "newRecordForm" // a unique identifier for this form
})(NewRecordForm);

// You have to connect() to any reducers that you wish to connect to yourself
export default (NewRecordForm = connect((state, props) => {
  const activity = props.activities[0] ? props.activities[0].name : "";
  const project = props.projectIds[0];
  const subproject = props.subprojectIds[0];
  const task = props.taskIds[0];
  return {
    initialValues: {
      ...state.records.newRecord,
      activity,
      project,
      subproject,
      task
    }
  };
})(NewRecordForm));
