import React, { Component } from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import { auth, database, provider } from "./firebase.js";

import { Container } from "semantic-ui-react";

import ApplicationRouter from "./containers/ApplicationRouter";
import rootReducer from "./reducers/rootReducer.js";
import { loadProjects, loadRecords } from "./actions/dataActions";
import { receiveLogin } from "./actions/uiActions";

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk.withExtraArgument({ auth, database, provider }))
);

class App extends Component {
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        store.dispatch(receiveLogin(user));
        store.dispatch(loadRecords());
        store.dispatch(loadProjects());
      }
    });
  }

  render() {
    return (
      <div>
        <Container style={{ margin: "1em", padding: "1em" }}>
          <Provider store={store}>
            <ApplicationRouter />
          </Provider>
        </Container>
      </div>
    );
  }
}

export default App;
