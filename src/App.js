import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MyNavbar from './Navbar';
import { Container } from 'semantic-ui-react'

import { createStore, applyMiddleware } from 'redux'
import uiState from './reducers/uiReducer.js'
import thunk from 'redux-thunk';

import firebase, { auth, provider } from './firebase.js';

const store = createStore(
  uiState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk.withExtraArgument({ auth, provider }))
);

class App extends Component {
  render() {
    return (
      <div>
        <Container style={{ margin: '1em', padding: '1em' }}>
          <MyNavbar store={store} />
        </Container>
      </div>
    );
  }
}

export default App;
