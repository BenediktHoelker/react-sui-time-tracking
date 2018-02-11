import React from "react";
import { Form, Header, Segment } from "semantic-ui-react";

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
            options={props.subProjects
              .filter((subProject, index) => {
                return props.projects
                  .find(project => {
                    return project.name === props.newRecord.project;
                  })
                  .subProjects.includes(index);
              })
              .map(subProject => ({
                key: subProject.name,
                value: subProject.name,
                text: subProject.name
              }))}
            onChange={props.handleChange}
            loading={props.subProjectsLoading}
          />
          <Form.Input
            label="Arbeitspaket"
            name="scope"
            onChange={props.handleChange}
            value={props.newRecord.scope}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            label="Tätigkeit"
            name="task"
            onChange={props.handleChange}
            value={props.newRecord.task}
          />
          <Form.Input
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

export default NewRecordForm;
