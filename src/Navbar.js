import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'

import MyGrid from './Grid';
import MyForm from './Form';
import MyTable from './Table';

class SidebarLeftOverlay extends Component {
  state = { visible: false }

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
                    <MyForm/>
                </Segment>
                <Header as='h4' attached='top' block>
                    Bereits erfasste Tätigkeiten
                </Header>
                <Segment attached>
                    <MyTable basic/>      
                </Segment>
            </Segment>          
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default SidebarLeftOverlay
