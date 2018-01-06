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
      companies: [],
      companiesLoading: true,
      workItem: {
        subproject: 'Logistik',
        scope: 'Frontend',
        task: 'Programmierung',
        description: 'React-Entwicklung',
        date: now.toLocaleDateString(),
        timeStart: props.lastItem ? props.lastItem.timeEnd : now.toLocaleTimeString(),
        timeEnd: now.toLocaleTimeString()
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    var now = new Date();
    this.setState({
      timeStart: props.lastItem ? props.lastItem.timeEnd : this.state.timeStart,
      companies: props.companies,
      companiesLoading: props.companiesLoading,
      workItem: props.workItem
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
    let workItem = this.state.workItem;
    e.preventDefault();
    const itemsRef = firebase.database().ref('items');
    const now = new Date();
    const dateStart = moment(workItem.date + ' ' + workItem.timeStart, 'DD.MM.YYYY HH:mm:ss');
    const dateEnd = moment(workItem.date + ' ' + workItem.timeEnd, 'DD.MM.YYYY HH:mm:ss');
    const dateDiff = dateEnd.diff(dateStart);
    const timeSpent = moment.utc(dateDiff).format("HH:mm:ss");

    const item = {
      project: workItem.project,
      subproject: workItem.subproject,
      scope: workItem.scope,
      task: workItem.task,
      description: workItem.description,
      date: workItem.date,
      timeStart: workItem.timeStart,
      timeEnd: workItem.timeEnd,
      timeSpent: timeSpent
    }
    itemsRef.push(item);
    this.setState({
      workItem: {
        project: '',
        subproject: '',
        scope: '',
        task: '',
        description: '',
        date: now.toLocaleDateString(),
        timeStart: now.toLocaleTimeString(),
        timeEnd: now.toLocaleTimeString()
      }
    });
  }

  render() {
    return (
      <div>
        <Header as='h4' attached='top' block>
          Tätigkeiten erfassen
        </Header>
        <Segment attached>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group widths='equal'>
              <Form.Dropdown label='Projekt' name="project" search selection options={this.props.companies} onChange={this.handleSelect} loading={this.props.companiesLoading} />
              <Form.Input label='Teilprojekt' name="subproject" onChange={this.handleChange} value={this.state.workItem.subproject} />
              <Form.Input label='Arbeitspaket' name="scope" onChange={this.handleChange} value={this.state.workItem.scope} />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input label='Tätigkeit' name="task" onChange={this.handleChange} value={this.state.workItem.task} />
              <Form.Input label='Beschreibung' name="description" onChange={this.handleChange} value={this.state.workItem.description} />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input label='Datum' name="date" onChange={this.handleChange} value={this.state.workItem.date} />
              <Form.Input label='Beginn' name="timeStart" onChange={this.handleChange} value={this.state.workItem.timeStart} />
              <Form.Input label='Ende' name="timeEnd" onChange={this.handleChange} value={this.state.workItem.timeEnd} />
            </Form.Group>
            <Form.Button>Abschicken</Form.Button>
          </Form>
        </Segment>
      </div>
    );
  }
}



export default FormExampleWidthField
