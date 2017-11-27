import React, { Component } from 'react'
import { Grid, Button, Header, Image, Icon, Menu, Sidebar, Segment } from 'semantic-ui-react'

import MyGrid from './Grid'
import MyForm from './Form'
import MyTable from './Table'
import MySearch from './Search'
import firebase from './firebase.js'

class SidebarLeftOverlay extends Component {
  constructor() {
    super()
    this.state = {
      items: []
    }
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref('items')
    const samplesRef = firebase.database().ref('samples')

    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val()
      let newState = []
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
          timeSpent: items[item].timeSpent
        });

        this.setState({
          items: newState
        });
      }

      let companies = []
      samplesRef.on('value', (snapshot) => {
        let samples = snapshot.val()
        companies = samples.map(sample => Object.assign({
          key: sample.company, value: sample.company, text: sample.company
        }))
        
        this.setState({
          companies: companies
        });
      })

      
    });
  }

  handleRemove = (itemId) => {
    const itemsRef = firebase.database().ref('items/' + itemId)
    itemsRef.remove()
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    const { visible } = this.state
    return (
      <div>
        {/* <Button onClick={this.toggleVisibility}>Seitenleiste einblenden</Button>
         */}
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
                <MyForm item={this.state.newItem} companies={this.state.companies} submitHandler={this.handleSubmit} changeHandler={this.handleChange} />
              </Segment>
              <Header as='h4' attached='top' block>
                <Grid>
                  <Grid.Column width={12}>
                    Bereits erfasste Tätigkeiten
                  </Grid.Column>
                  <Grid.Column width={4} >
                    <MySearch items={this.state.items} />
                  </Grid.Column>
                </Grid>
              </Header>
              <Segment attached>
                <MyTable basic items={this.state.items} handleRemove={this.handleRemove} />
              </Segment>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default SidebarLeftOverlay
