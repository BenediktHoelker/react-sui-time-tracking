import React, { Component } from 'react'
import { Button, Container, Grid, Header, Image, Icon, Menu, Sidebar, Segment } from 'semantic-ui-react'

import MyGrid from './Grid'
import MyForm from './Form'
import MyTable from './Table'
import MySearch from './Search'
import MySidebar from './Sidebar'
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
      }

      this.setState({
        items: newState,
        lastItem: newState[newState.length - 1]
      });

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
        <Sidebar.Pushable as={Segment}>
          <MySidebar visible={visible} items={this.state.items} />
          <Sidebar.Pusher>
            <Segment basic>
              <Menu >
                <Menu.Item icon='sidebar' onClick={this.toggleVisibility} />
                <Menu.Item header as='h3'>Arbeitszeiterfassung</Menu.Item>
              </Menu>
              <Header as='h4' attached='top' block>
                Tätigkeiten erfassen
                </Header>
              <Segment attached>
                <MyForm
                  item={this.state.newItem}
                  lastItem={this.state.lastItem}
                  companies={this.state.companies}
                  submitHandler={this.handleSubmit}
                  changeHandler={this.handleChange} />
              </Segment>
              <Header as='h4' attached='top' block>
                <Grid stackable columns={3}>
                  <Grid.Column textAlign='left'>
                    Bereits erfasste Tätigkeiten
                  </Grid.Column>
                  <Grid.Column floated='right' textAlign='right'>
                    <MySearch fluid vertical items={this.state.items} />
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
