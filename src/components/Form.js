import React from "react";
import { Form, Header, Segment } from "semantic-ui-react";
import { Field, reduxForm } from 'redux-form';
import { InputField } from 'react-semantic-redux-form';

const NewRecordForm = props => (
  <div>
    <Header as="h4" attached="top" block>
      Tätigkeiten erfassen
    </Header>
    <Segment attached>
      <Form onSubmit={props.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Dropdown
            label="Projekt"
            name="project"
            search
            selection
            value={props.newRecord.project}
            options={props.projects.map(project => ({
              key: project.name,
              value: project.name,
              text: project.name
            }))}
            onChange={props.handleChange}
            loading={props.projectsLoading}
          />
          <Form.Dropdown
            label="Teilprojekt"
            name="subProject"
            search
            selection
            value={props.newRecord.subProject}
            options={props.subProjects}
            onChange={props.handleChange}
            loading={props.subProjectsLoading}
          />
          <Form.Dropdown
            label="Arbeitspaket"
            name="task"
            search
            selection
            value={props.newRecord.task}
            options={props.tasks}
            onChange={props.handleChange}
            loading={props.tasksLoading}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Dropdown
            label="Tätigkeit"
            name="activity"
            search
            selection
            value={props.newRecord.activity}
            options={props.activities.map(activity => ({
              key: activity.name,
              value: activity.name,
              text: activity.name
            }))}
            onChange={props.handleChange}
            loading={props.tasksLoading}
          />
          <Field 
            component={InputField}
            label="Beschreibung"
            name="description"
            onChange={props.handleChange}
            value={props.newRecord.description}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            label="Datum"
            name="date"
            onChange={props.handleChange}
            value={props.newRecord.date}
          />
          <Form.Input
            label="Beginn"
            name="timeStart"
            onChange={props.handleChange}
            value={props.newRecord.timeStart}
          />
          <Form.Input
            label="Ende"
            name="timeEnd"
            onChange={props.handleChange}
            value={props.newRecord.timeEnd}
          />
        </Form.Group>
        <Form.Button>Abschicken</Form.Button>
      </Form>
    </Segment>
  </div>
);

//export default NewRecordForm;

export default reduxForm({
	form: 'newRecordForm',	// a unique identifier for this form

})(NewRecordForm)