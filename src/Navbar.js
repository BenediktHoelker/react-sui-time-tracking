import React, { Component } from 'react'
import { Button, Container, Grid, Header, Image, Icon, Menu, Sidebar, Segment } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

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
      vMenuActiveItem: "",
      hMenuActiveItem: "erfassung",
      companies: [],
      companiesLoading: true,
      newState: {},
      items: [],
      nextStartTime: "",
      visible: false,
      workItem: {}
    }
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref(this.props.user.uid + '/items')
    const samplesRef = firebase.database().ref('samples')
    let companies = []

    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val()
      let newState = []
      for (let item in items) {
        newState.push({
          id: item,
          project: items[item].project,
          subproject: items[item].subproject,
          scope: items[item].scope,
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
        nextStartTime: newState[newState.length - 1] ? newState[newState.length - 1].timeEnd : new Date().toLocaleTimeString()
      });
    });

    samplesRef.on('value', (snapshot) => {
      let samples = snapshot.val()
      companies = samples.map(sample => Object.assign({
        key: sample.company,
        value: sample.company,
        text: sample.company
      }))

      this.setState({
        companies: companies,
        companiesLoading: false
      });
    })
  }

  handleRemove = (itemId) => {
    const itemsRef = firebase.database().ref(this.props.user.uid + '/items/' + itemId)
    itemsRef.remove()
  }

  handleVMenuItemClick = (id) => {
    firebase.database().ref(this.props.user.uid + '/items/' + id).once('value', (snapshot) => {
      this.setState({
        vMenuActiveItem: id,
        workItem: { ...snapshot.val(), ...{ id: id } }
      })
    });
  }

  handleHMenuItemClick = (e, { name }) => this.setState({ hMenuActiveItem: name })

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    const state = this.state
    return (
      <Router>
        <Sidebar.Pushable as={Segment}>
          <MySidebar visible={state.visible} items={state.items} handleItemClick={this.handleVMenuItemClick} activeItem={state.vMenuActiveItem} />
          <Sidebar.Pusher>
            <Segment basic>
              <Menu >
                <Menu.Item icon='sidebar' onClick={this.toggleVisibility} />
                <Menu.Item header as='h3'>Arbeit</Menu.Item>
                <Menu.Item as={Link} to='/create' name='erfassung' active={this.state.hMenuActiveItem === 'erfassung'} onClick={this.handleHMenuItemClick} />
                <Menu.Item as={Link} to='/' name='auswertung' active={this.state.hMenuActiveItem === 'auswertung'} onClick={this.handleHMenuItemClick} />
              </Menu>
              <Route exact path="/create" render={(routeProps) => (
                <MyForm {...routeProps} {
                  ...{
                    companies: this.state.companies,
                    companiesLoading: this.state.companiesLoading,
                    nextStartTime: this.state.nextStartTime,
                    user: this.props.user,
                    workItem: this.state.workItem
                  }} />
              )} />
              <Route exact path="/" render={(routeProps) => (
                <MyTable {...routeProps} {...{
                  handleRemove: this.handleRemove,
                  items: this.state.items
                }} />
              )} />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Router>
    )
  }
}

export default SidebarLeftOverlay
