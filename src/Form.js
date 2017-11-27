import React, { Component } from 'react'
import { Form, Dropdown, Header, Segment } from 'semantic-ui-react'
import firebase from './firebase.js';
import moment from 'moment';

class FormExampleWidthField extends Component {
  constructor(props) {
    super(props);
    var now = new Date();
    this.state = {
      visible: false,
      subproject: 'Logistik',
      workitem: 'Frontend',
      task: 'Programmierung',
      description: 'React-Entwicklung',
      date: now.toLocaleDateString(),
      timeStart: now.toLocaleTimeString(),
      timeEnd: now.toLocaleTimeString()
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSelect(e, {value}) {
    e.preventDefault();
    this.setState({
      project: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('items');
    const now = new Date();
    const dateStart = moment(this.state.date + ' ' + this.state.timeStart, 'DD.MM.YYYY HH:mm:ss');
    const dateEnd = moment(this.state.date + ' ' + this.state.timeEnd, 'DD.MM.YYYY HH:mm:ss');
    const dateDiff = dateEnd.diff(dateStart);
    const timeSpent = moment.utc(dateDiff).format("HH:mm:ss");

    const item = {
      project: this.state.project,
      subproject: this.state.subproject,
      workitem: this.state.workitem,
      task: this.state.task,
      description: this.state.description,
      date: this.state.date,
      timeStart: this.state.timeStart,
      timeEnd: this.state.timeEnd,
      timeSpent: timeSpent
    }
    itemsRef.push(item);
    this.setState({
      project: '',
      subproject: '',
      workitem: '',
      task: '',
      description: '',
      date: now.toLocaleDateString(),
      timeStart: now.toLocaleTimeString(),
      timeEnd: now.toLocaleTimeString()
    });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Dropdown placeholder='Projekt auswählen' name="project" search selection options={this.props.companies} onChange={this.handleSelect} />
          <Form.Input placeholder='Teilprojekt' name="subproject" width={3} onChange={this.handleChange} value={this.state.subproject} />
          <Form.Input placeholder='Arbeitspaket' name="workitem" width={3} onChange={this.handleChange} value={this.state.workitem} />
          <Form.Input placeholder='Tätigkeit' name="task" width={3} onChange={this.handleChange} value={this.state.task} />
          <Form.Input placeholder='Beschreibung' name="description" width={3} onChange={this.handleChange} value={this.state.description} />
        </Form.Group>
        <Form.Group>
          <Form.Input placeholder='Datum' name="date" width={6} placeholder="Datum" onChange={this.handleChange} value={this.state.date} />
          <Form.Input placeholder='Beginn' name="timeStart" width={5} placeholder="Beginn" onChange={this.handleChange} value={this.state.timeStart} />
          <Form.Input placeholder='Ende' name="timeEnd" width={5} placeholder="Ende" onChange={this.handleChange} value={this.state.timeEnd} />
        </Form.Group>
        <Form.Button>Abschicken</Form.Button>
      </Form>
    );
  }
}



export default FormExampleWidthField
