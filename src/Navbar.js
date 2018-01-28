import React, {Component} from 'react'
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
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import MyGrid from './Grid'
import MyForm from './Form'
import MyTable from './Table'
import MySearch from './Search'
import MySidebar from './Sidebar'
import firebase, {auth, provider} from './firebase.js';

import {connect} from 'react-redux'
import {
  getUser,
  loadProjects,
  triggerLogin,
  triggerLogout,
  toggleNavbar,
  requestWorkItems
} from './actions/uiActions'

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
  }

  componentDidMount() {
    const store = this.props.store;
    store
      .dispatch(getUser())
      .then((result) => {
        store.dispatch(requestWorkItems(result.user))
      });

    store.dispatch(loadProjects())
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

  handleHMenuItemClick = (e, {name}) => this.setState({hMenuActiveItem: name})

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
                activeItem={state.vMenuActiveItem}/>
            : ""}
          <Sidebar.Pusher>
            <Segment basic>
              <Menu stackable>
                <Menu.Item icon='sidebar' onClick={this.props.toggleVisibility}/>
                <Menu.Item icon='external' onClick={this.props.toggleVisibility}/>
                <Menu.Item header as='h3'>Arbeit</Menu.Item>
                <Menu.Item
                  as={Link}
                  to='/create'
                  name='erfassung'
                  active={this.state.hMenuActiveItem === 'erfassung'}
                  onClick={this.handleHMenuItemClick}/>
                <Menu.Item
                  as={Link}
                  to='/'
                  name='auswertung'
                  active={this.state.hMenuActiveItem === 'auswertung'}
                  onClick={this.handleHMenuItemClick}/> {this.props.user
                  ? <Menu.Item onClick={this.props.logout} position='right'>{this.props.user.displayName}
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
                      { ...{ companies: this.props.projects, companiesLoading: this.props.projectsLoading, nextStartTime: this.props.nextStartTime, user: this.props.user, workItem: this.props.workItem }}/>)}/>
                    <Route
                      exact
                      path="/"
                      render={(routeProps) => (<MyTable
                      {...routeProps}
                      {...{ items: this.props.items ? this.props.items : [], handleRemove: this.handleRemove, user: this.props.user }}/>)}/>
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
  return {visible: state.isNavbarVisible, user: state.user, projects: state.projects, projectsLoading: state.projectsLoading, items: state.items}
}

const mapDispatchToProps = dispatch => {
  return {
    toggleVisibility: () => {
      dispatch(toggleNavbar())
    },
    login: () => {
      dispatch(triggerLogin())
    },
    logout: () => {
      dispatch(triggerLogout())
    }
  }
}

export default SidebarLeftOverlay = connect(mapStateToProps, mapDispatchToProps)(SidebarLeftOverlay)
