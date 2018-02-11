import * as types from "./actionTypes";

export function loadProjects() {
  return (dispatch, getState, firebase) => {
    const projectsRef = firebase.database.ref("projects");
    const subProjectsRef = firebase.database.ref("subProjects");

    dispatch(requestProjects());
    dispatch(requestSubProjects());

    projectsRef.on("value", snapshot => {
      dispatch(receiveProjects(snapshot.val()));
    });

    subProjectsRef.on("value", snapshot => {
      dispatch(receiveSubProjects(snapshot.val()));
    });
  };
}

export function requestProjects() {
  return { type: types.REQUEST_PROJECTS };
}

export function receiveProjects(projects) {
  return { type: types.RECEIVE_PROJECTS, projects: projects };
}

export function requestSubProjects() {
  return { type: types.REQUEST_SUB_PROJECTS };
}

export function receiveSubProjects(subProjects) {
  return { type: types.RECEIVE_SUB_PROJECTS, subProjects: subProjects };
}

