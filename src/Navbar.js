import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'

import MyGrid from './Grid';
import MyForm from './Form';
import MyTable from './Table';
import firebase from './firebase.js';

class SidebarLeftOverlay extends Component {
  constructor() {
    super();
    this.state = {
      items: []
    }
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref('items');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          project: items[item].project,
          subproject: items[item].subproject,
          workitem: items[item].workitem,
          task: items[item].task,
          description: items[item].description,
          date: items[item].date,
          timeStart: items[item].timeStart,
          timeEnd: items[item].timeEnd,
        });
      }
      this.setState({
        items: newState
      });
    });
  }

  handleRemove = (itemId) => {
    console.log(itemId);
    const itemsRef = firebase.database().ref('items/' + itemId);
    itemsRef.remove();
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    const { visible } = this.state
    return (
      <div>
        <Button onClick={this.toggleVisibility}>Toggle Visibility</Button>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='push' width='thin' visible={visible} icon='labeled' vertical>
            <Menu.Item name='home'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item name='gamepad'>
              <Icon name='gamepad' />
              Games
            </Menu.Item>
            <Menu.Item name='camera'>
              <Icon name='camera' />
              Channels
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <Header as='h3'>Arbeitszeiterfassung</Header>
              <Header as='h4' attached='top' block>
                Tätigkeiten erfassen
                </Header>
              <Segment attached>
                <MyForm item={this.state.newItem} submitHandler={this.handleSubmit} changeHandler={this.handleChange} />
              </Segment>
              <Header as='h4' attached='top' block>
                Bereits erfasste Tätigkeiten
                </Header>
              <Segment attached>
                <MyTable basic items={this.state.items} handleRemove={this.handleRemove}/>
              </Segment>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default SidebarLeftOverlay
