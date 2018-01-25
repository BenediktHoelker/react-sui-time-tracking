import React, { Component } from 'react'
import {
  Button,
  Container,
  Grid,
  Header,
  Image,
  Icon,
  Menu,
  Message,
  Sidebar,
  Segment
} from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import MyGrid from './Grid'
import MyForm from './Form'
import MyTable from './Table'
import MySearch from './Search'
import MySidebar from './Sidebar'
import firebase, { auth, provider } from './firebase.js';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { triggerLogin, toggleNavbar } from './actions/uiActions'

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
      user: null,
      visible: false,
      workItem: {}
    }

    this.login = this
      .login
      .bind(this);
    this.logout = this
      .logout
      .bind(this);
  }

  componentDidMount() {
    const samplesRef = firebase
      .database()
      .ref('samples')

    samplesRef.on('value', (snapshot) => {
      let samples = snapshot.val()
      let companies = samples.map(sample => Object.assign({ key: sample.company, value: sample.company, text: sample.company }))
      this.setState({ companies: companies, companiesLoading: false });
    })

    auth
      .getRedirectResult()
      .then((result) => {
        let user = result.user
        this.setState({ user })
        if (user) {
          const itemsRef = firebase
            .database()
            .ref('items/' + this.props.user.uid)

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
              nextStartTime: newState[newState.length - 1]
                ? newState[newState.length - 1].timeEnd
                : new Date().toLocaleTimeString()
            });
          });
        }
      });
  }

  logout() {
    auth
      .signOut()
      .then(() => {
        this.setState({ user: null });
      });
  }

  login() {
    auth
      .signInWithRedirect(provider)
      .then((result) => {
        const user = result.user;
        this.setState({ user });
      });
  }

  handleRemove = (itemId) => {
    const itemsRef = firebase
      .database()
      .ref('/items/' + this.props.user.uid + "/" + itemId)
    itemsRef.remove()
  }

  handleVMenuItemClick = (id) => {
    console.log(id);
    this.setState({
      workItem: {
        ...{
          id: id
        }
      }
    })
    firebase
      .database()
      .ref('/items/' + this.props.user.uid + "/" + id)
      .once('value', (snapshot) => {
        this.setState({
          vMenuActiveItem: id,
          workItem: {
            ...snapshot.val(),
            ...{
              id: id
            }
          }
        })
      });
  }

  handleHMenuItemClick = (e, { name }) => this.setState({ hMenuActiveItem: name })

  /* toggleVisibility = () => this.setState({
    visible: !this.state.visible
  }) */

  render() {
    const state = this.state
    return (
      <Router>
        <Sidebar.Pushable as={Segment}>
          {this.props.user
            ? <MySidebar
              visible={this.props.visible}
              items={state.items}
              handleItemClick={this.handleVMenuItemClick}
              activeItem={state.vMenuActiveItem} />
            : ""}
          <Sidebar.Pusher>
            <Segment basic>
              <Menu stackable>
                <Menu.Item icon='sidebar' onClick={this.props.toggleVisibility} />
                <Menu.Item icon='external' onClick={this.props.toggleVisibility} />
                <Menu.Item header as='h3'>Arbeit</Menu.Item>
                <Menu.Item
                  as={Link}
                  to='/create'
                  name='erfassung'
                  active={this.state.hMenuActiveItem === 'erfassung'}
                  onClick={this.handleHMenuItemClick} />
                <Menu.Item
                  as={Link}
                  to='/'
                  name='auswertung'
                  active={this.state.hMenuActiveItem === 'auswertung'}
                  onClick={this.handleHMenuItemClick} /> {this.props.user
                    ? <Menu.Item onClick={this.logout} position='right'>{this.props.user.displayName}
                      - Logout</Menu.Item>
                    : <Menu.Item onClick={this.props.login} position='right'>Login</Menu.Item>
                }
              </Menu>
              {this.props.user
                ? <div>
                  <Route
                    exact
                    path="/create"
                    render={(routeProps) => (<MyForm
                      {...routeProps}
                      { ...{ companies: this.state.companies, companiesLoading: this.state.companiesLoading, nextStartTime: this.state.nextStartTime, user: this.props.user, workItem: this.state.workItem }} />)} />
                  <Route
                    exact
                    path="/"
                    render={(routeProps) => (<MyTable
                      {...routeProps}
                      {...{ items: this.state.items, handleRemove: this.handleRemove, user: this.props.user }} />)} />
                </div>
                : <Message>
                  <Message.Header>
                    Nicht eingeloggt
                  </Message.Header>
                  <p>
                    Sie müssen eingeloggt sein, um die Anwendung zu nutzen
                  </p>
                </Message>
              }
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Router>
    )
  }
}


const mapStateToProps = state => {
  return {
    visible: state.isNavbarVisible,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleVisibility: () => {
      dispatch(toggleNavbar())
    },
    login: bindActionCreators(triggerLogin, dispatch)
  }
}

export default SidebarLeftOverlay = connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarLeftOverlay)


