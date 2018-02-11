import * as types from "./actionTypes";

export function loadProjects() {
  return (dispatch, getState, firebase) => {
    const projectsRef = firebase.database.ref("projects");

    dispatch(requestProjects());

    projectsRef.on("value", snapshot => {
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

