import * as types from "./actionTypes";

function snapshotToArray(snapshot) {
  const allIds = [];

  snapshot.forEach(function(childSnapshot) {
    let key = childSnapshot.key;
    allIds.push(key);
  });

  return allIds;
}

export function loadProjects() {
  return (dispatch, getState, firebase) => {
    const activitiesRef = firebase.database.ref("activities");
    const projectsRef = firebase.database.ref("projects");
    const subprojectsRef = firebase.database.ref("subprojects");
    const tasksRef = firebase.database.ref("tasks");

    dispatch(requestProjects());
    dispatch(requestSubprojects());
    dispatch(requestTasks());
    dispatch(requestActivities());

    activitiesRef.on("value", snapshot => {
      dispatch(receiveActivities(snapshot.val()));
    });

    projectsRef.on("value", snapshot => {
      dispatch(receiveProjects(snapshot.val()));
    });

    subprojectsRef.on("value", snapshot => {
      dispatch(receiveSubprojects(snapshot.val(), snapshotToArray(snapshot)));
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

export function requestSubprojects() {
  return { type: types.REQUEST_SUB_PROJECTS };
}

export function receiveSubprojects(byId, allIds) {
  return { type: types.RECEIVE_SUB_PROJECTS, byId: byId, allIds: allIds };
}

export function requestTasks() {
  return { type: types.REQUEST_TASKS };
}

export function receiveTasks(tasks) {
  return { type: types.RECEIVE_TASKS, tasks: tasks };
}
