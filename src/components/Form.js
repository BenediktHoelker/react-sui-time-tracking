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
            options={props.projects.map(project => ({
              key: project.name,
              value: project.name,
              text: project.name
            }))}
            loading={props.projectsLoading}
          />
          <Field
            component={SelectField}
            label="Teilprojekt"
            name="subproject"
            options={props.subprojects.map(subproject => ({
              key: subproject.name,
              value: subproject.name,
              text: subproject.name
            }))}
            loading={props.subprojectsLoading}
          />
          <Field
            component={SelectField}
            label="Arbeitspaket"
            name="task"
            options={props.tasks.map(task => ({
              key: task.name,
              value: task.name,
              text: task.name
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
  form: "newRecordForm" // a unique identifier for this form
})(NewRecordForm);

// You have to connect() to any reducers that you wish to connect to yourself
export default (NewRecordForm = connect(state => ({
  initialValues: state.records.newRecord // pull initial values from account reducer
}))(NewRecordForm));
