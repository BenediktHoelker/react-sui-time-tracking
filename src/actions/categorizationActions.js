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
    // const activitiesRef = firebase.firestore.ref("activities");
    const projectsRef = firebase.database.ref("projects");
    const subprojectsRef = firebase.database.ref("subprojects");
    const tasksRef = firebase.database.ref("tasks");

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
          receiveActivities(
            byId,
            querySnapshot.docs.map(doc => doc.id)
          )
        );
      });

    projectsRef.on("value", snapshot => {
      dispatch(receiveProjects(snapshot.val(), snapshotToArray(snapshot)));
    });

    subprojectsRef.on("value", snapshot => {
      dispatch(receiveSubprojects(snapshot.val(), snapshotToArray(snapshot)));
    });

    tasksRef.on("value", snapshot => {
      dispatch(receiveTasks(snapshot.val(), snapshotToArray(snapshot)));
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
