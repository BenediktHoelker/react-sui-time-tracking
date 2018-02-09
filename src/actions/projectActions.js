import * as types from "./actionTypes";

export function loadProjects() {
  return (dispatch, getState, firebase) => {
    dispatch(requestProjects());

    const samplesRef = firebase.database.ref("samples");

    samplesRef.on("value", snapshot => {
      dispatch(receiveProjects(snapshot.val()));
    });
  };
}

export function requestProjects() {
  return { type: types.REQUEST_PROJECTS };
}

export function receiveProjects(projects) {
  return { type: types.RECEIVE_PROJECTS, projects: projects };
}

