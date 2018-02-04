import React, { Component } from 'react';
import './App.css';
import MyNavbar from './Navbar';
import { Container } from 'semantic-ui-react'

import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/rootReducer.js'
import thunk from 'redux-thunk';

import { auth, database, provider } from './firebase.js';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk.withExtraArgument({ auth, database, provider }))
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
