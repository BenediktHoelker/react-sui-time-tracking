import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MyNavbar from './Navbar';
import { Container } from 'semantic-ui-react'

class App extends Component {
  render() {
    return (
      <div>
        <Container style={{ margin: '1em', padding: '1em' }}>
          <MyNavbar user={this.props.user}/>
        </Container>
      </div>
    );
  }
}

export default App;
