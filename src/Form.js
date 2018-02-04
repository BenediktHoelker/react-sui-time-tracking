import React, { Component } from "react";
import { Form, Header, Segment } from "semantic-ui-react";
import firebase from "./firebase.js";
import moment from "moment";

class FormExampleWidthField extends Component {
  constructor(props) {
    super(props);
    //this.state = this.createNewWorkItem();
    this.handleSelect = this.handleSelect.bind(this);
  }

  createNewWorkItem = function() {
    var now = new Date();
    return {
      visible: false,
      companies: [],
      companiesLoading: true,
      workItem: {
        project: "",
        subproject: "Logistik",
        scope: "Frontend",
        task: "Programmierung",
        description: "React-Entwicklung",
        date: now.toLocaleDateString(),
        timeStart: now.toLocaleTimeString(),
        timeEnd: now.toLocaleTimeString()
      }
    };
  };

  componentWillReceiveProps(props) {
    this.setState({
      companies: props.companies,
      companiesLoading: props.companiesLoading,
      /* workItem: {
        ...props.workItem,
        ...this.state.workItem,
        ...{
          timeStart: props.workItem
            ? props.workItem.timeStart
            : props.nextStartTime
        }
      } */
    });
  }

  handleSelect(e, { value }) {
    e.preventDefault();
    this.setState({
      workItem: { ...this.state.workItem, ...{ project: value } }
    });
  }

  render() {
    return (
      <div>
        <Header as="h4" attached="top" block>
          Tätigkeiten erfassen
        </Header>
        <Segment attached>
          <Form onSubmit={this.props.handleSubmit.bind(this)}>
            <Form.Group widths="equal">
              <Form.Dropdown
                label="Projekt"
                name="project"
                search
                selection
                options={this.props.companies}
                onChange={this.handleSelect}
                loading={this.props.companiesLoading}
                value={this.props.workItem.project}
              />
              <Form.Input
                label="Teilprojekt"
                name="subproject"
                onChange={this.props.handleChange}
                value={this.props.workItem.subproject}
              />
              <Form.Input
                label="Arbeitspaket"
                name="scope"
                onChange={this.props.handleChange}
                value={this.props.workItem.scope}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                label="Tätigkeit"
                name="task"
                onChange={this.props.handleChange}
                value={this.props.workItem.task}
              />
              <Form.Input
                label="Beschreibung"
                name="description"
                onChange={this.props.handleChange}
                value={this.props.workItem.description}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                label="Datum"
                name="date"
                onChange={this.props.handleChange}
                value={this.props.workItem.date}
              />
              <Form.Input
                label="Beginn"
                name="timeStart"
                onChange={this.props.handleChange}
                value={this.props.workItem.timeStart}
              />
              <Form.Input
                label="Ende"
                name="timeEnd"
                onChange={this.props.handleChange}
                value={this.props.workItem.timeEnd}
              />
            </Form.Group>
            <Form.Button>Abschicken</Form.Button>
          </Form>
        </Segment>
      </div>
    );
  }
}

export default FormExampleWidthField;
