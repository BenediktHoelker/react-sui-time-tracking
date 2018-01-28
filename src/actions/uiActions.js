import * as types from './actionTypes';

export function toggleNavbar(isNavbarVisible) {
  return {type: types.TOGGLE_NAVBAR, isNavbarVisible};
}

export function triggerLogin() {
  return (dispatch, getState, firebase) => {
    return firebase
      .auth
      .signInWithRedirect(firebase.provider)
      .then((result) => dispatch(receiveLogin(result)));
  };
}

export function receiveLogin(result) {
  return {type: types.RECEIVE_LOGIN, user: result.user};
}

export function triggerLogout() {
  return (dispatch, getState, firebase) => {
    return firebase
      .auth
      .signOut()
      .then((result) => dispatch(receiveLogout(result)));
  };
}

export function receiveLogout() {
  return {type: types.RECEIVE_LOGOUT};
}

export function getUser() {
  return (dispatch, getState, firebase) => {
    return firebase
      .auth
      .getRedirectResult()
      .then((result) => {
        if (result.user) {
          dispatch(receiveLogin(result))
          return Promise.resolve(result)
        } else {
          return Promise.reject()
        }
      })
  }
}

export function requestProjects(projects) {
  return {type: types.REQUEST_PROJECTS};
}

export function loadProjects() {
  return (dispatch, getState, firebase) => {

    dispatch(requestProjects());

    const samplesRef = firebase
      .database
      .ref('samples')

    samplesRef.on('value', (snapshot) => {
      let samples = snapshot.val()
      let companies = samples.map(sample => ({key: sample.company, value: sample.company, text: sample.company}))
      dispatch(receiveProjects(companies))
    })
  }
}

export function requestWorkItems(user) {
  return (dispatch, getState, firebase) => {
    const itemsRef = firebase
      .database
      .ref('items/' + user.uid)

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

      dispatch(setItems(newState))
    })
  }
}

export function setItems(items) {
  return {type: types.SET_ITEMS, items: items};
}

export function receiveProjects(projects) {
  return {type: types.RECEIVE_PROJECTS, projects: projects};
}