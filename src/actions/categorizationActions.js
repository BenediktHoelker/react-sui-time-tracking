import * as types from "./actionTypes";

export function loadProjects() {
  return (dispatch, getState, firebase) => {

    dispatch(requestProjects());
    dispatch(requestSubprojects());
    dispatch(requestTasks());
    dispatch(requestActivities());

    firebase.firestore
      .collection("activities")
      .get()
      .then(querySnapshot => {
        const byId = {};
        querySnapshot.forEach(doc => {
          byId[doc.id] = doc.data();
        });
        dispatch(
          receiveActivities(byId, querySnapshot.docs.map(doc => doc.id))
        );
      });

    firebase.firestore
      .collection("projects")
      .get()
      .then(querySnapshot => {
        const byId = {};
        querySnapshot.forEach(doc => {
          byId[doc.id] = doc.data();
        });
        dispatch(receiveProjects(byId, querySnapshot.docs.map(doc => doc.id)));
      });

    firebase.firestore
      .collection("subprojects")
      .get()
      .then(querySnapshot => {
        const byId = {};
        querySnapshot.forEach(doc => {
          byId[doc.id] = doc.data();
        });
        dispatch(
          receiveSubprojects(byId, querySnapshot.docs.map(doc => doc.id))
        );
      });

    firebase.firestore
      .collection("tasks")
      .get()
      .then(querySnapshot => {
        const byId = {};
        querySnapshot.forEach(doc => {
          byId[doc.id] = doc.data();
        });
        dispatch(
          receiveTasks(byId, querySnapshot.docs.map(doc => doc.id))
        );
      });
  };
}

export function requestActivities() {
  return { type: types.REQUEST_ACTIVITIES };
}

export function receiveActivities(byId, allIds) {
  return { type: types.RECEIVE_ACTIVITIES, byId: byId, allIds: allIds };
}

export function requestProjects() {
  return { type: types.REQUEST_PROJECTS };
}

export function receiveProjects(byId, allIds) {
  return { type: types.RECEIVE_PROJECTS, byId: byId, allIds: allIds };
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

export function receiveTasks(byId, allIds) {
  return { type: types.RECEIVE_TASKS, byId: byId, allIds: allIds };
}
