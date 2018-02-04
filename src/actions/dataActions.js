import * as types from "./actionTypes";
import moment from "moment";

export function requestProjects(projects) {
  return { type: types.REQUEST_PROJECTS };
}

export function loadProjects() {
  return (dispatch, getState, firebase) => {
    dispatch(requestProjects());

    const samplesRef = firebase.database.ref("samples");

    samplesRef.on("value", snapshot => {
      let samples = snapshot.val();
      let companies = samples.map(sample => ({
        key: sample.company,
        value: sample.company,
        text: sample.company
      }));
      dispatch(receiveProjects(companies));
    });
  };
}

export function handleRemoveItem(itemId) {
  return (dispatch, getState, firebase) => {
    const itemsRef = firebase.database.ref(
      "/items/" + getState().ui.user.uid + "/" + itemId
    );
    itemsRef.remove();
    //dispatch(removeFromState(itemId)) // Does not need to be triggered due to firebase realtime
  };
}

export function removeFromState(itemId) {
  return { type: types.REMOVE_FROM_STATE, itemId: itemId };
}

export function requestWorkItems(user) {
  return (dispatch, getState, firebase) => {
    const itemsRef = firebase.database.ref("items/" + user.uid);

    itemsRef.on("value", snapshot => {
      let items = snapshot.val();
      let newState = [];
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

      dispatch(setItems(newState));
    });
  };
}

export function setItems(items) {
  return { type: types.SET_ITEMS, items: items };
}

export function submitItem(event) {
  return (dispatch, getState, firebase) => {
    event.preventDefault();

    const state = getState();
    const userId = state.ui.user.uid;
    const workItem = state.data.workItem;

    const itemsRef = firebase.database.ref("items/" + userId);

    const dateStart = moment(
      workItem.date + " " + workItem.timeStart,
      "DD.MM.YYYY HH:mm:ss"
    );
    const dateEnd = moment(
      workItem.date + " " + workItem.timeEnd,
      "DD.MM.YYYY HH:mm:ss"
    );

    const dateDiff = dateEnd.diff(dateStart);
    const timeSpent = moment.utc(dateDiff).format("HH:mm:ss");
    const item = {
      ...workItem,
      ...{
        timeSpent: timeSpent
      }
    };

    if (item.id) {
      // Edit
      const key = "/items/" + userId + "/" + item.id;
      firebase.database.ref(key).set(item);
    } else {
      // Create
      itemsRef.push(item);
    }

    //dispatch(addItem(item));
  };
}

export function addItem(item) {
  return { type: types.ADD_ITEM, item: item };
}

export function editField(event) {
  event.preventDefault();
  return {
    type: types.EDIT_FIELD,
    name: event.target.name,
    value: event.target.value
  };
}
export function receiveProjects(projects) {
  return { type: types.RECEIVE_PROJECTS, projects: projects };
}
