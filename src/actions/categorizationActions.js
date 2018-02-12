import * as types from "./actionTypes";

export function loadProjects() {
  return (dispatch, getState, firebase) => {
    const activitiesRef = firebase.database.ref("activities");
    const projectsRef = firebase.database.ref("projects");
    const subProjectsRef = firebase.database.ref("subProjects");
    const tasksRef = firebase.database.ref("tasks");

    dispatch(requestProjects());
    dispatch(requestSubProjects());
    dispatch(requestTasks());
    dispatch(requestActivities());

    activitiesRef.on("value", snapshot => {
      dispatch(receiveActivities(snapshot.val()));
    });

    projectsRef.on("value", snapshot => {
      dispatch(receiveProjects(snapshot.val()));
    });

    subProjectsRef.on("value", snapshot => {
      dispatch(receiveSubProjects(snapshot.val()));
    });

    tasksRef.on("value", snapshot => {
      dispatch(receiveTasks(snapshot.val()));
    });
  };
}

export function requestActivities() {
  return { type: types.REQUEST_ACTIVITIES };
}

export function receiveActivities(activities) {
  return { type: types.RECEIVE_ACTIVITIES, activities: activities };
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

export function requestTasks() {
  return { type: types.REQUEST_TASKS };
}

export function receiveTasks(tasks) {
  return { type: types.RECEIVE_TASKS, tasks: tasks };
}

