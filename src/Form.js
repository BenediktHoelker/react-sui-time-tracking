import React, { Component } from 'react'
import { Form, Dropdown, Header, Segment } from 'semantic-ui-react'
import firebase from './firebase.js';
import moment from 'moment';

const style = {
  form: {
    margin: '0.5em',
  }
}

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
      timeStart: props.lastItem ? props.lastItem.timeEnd : now.toLocaleTimeString(),
      timeEnd: now.toLocaleTimeString()
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props){    
    var now = new Date();
    this.setState({
      timeStart: props.lastItem ? props.lastItem.timeEnd : this.state.timeStart
    })
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSelect(e, { value }) {
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
        <Form.Group widths='equal'>
          <Form.Dropdown label='Projekt' name="project" search selection options={this.props.companies} onChange={this.handleSelect} />
          <Form.Input label='Teilprojekt' name="subproject" onChange={this.handleChange} value={this.state.subproject} />
          <Form.Input label='Arbeitspaket' name="workitem" onChange={this.handleChange} value={this.state.workitem} />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input label='Tätigkeit' name="task" onChange={this.handleChange} value={this.state.task} />
          <Form.Input label='Beschreibung' name="description" onChange={this.handleChange} value={this.state.description} />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input label='Datum' name="date" onChange={this.handleChange} value={this.state.date} />
          <Form.Input label='Beginn' name="timeStart" onChange={this.handleChange} value={this.state.timeStart} />
          <Form.Input label='Ende' name="timeEnd" onChange={this.handleChange} value={this.state.timeEnd} />
        </Form.Group>
        <Form.Button>Abschicken</Form.Button>
      </Form>
    );
  }
}



export default FormExampleWidthField
