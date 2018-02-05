import * as types from "./actionTypes";
import moment from "moment";
import { setActiveHMenuItem } from "./uiActions";

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

export function requestProjects(projects) {
  return { type: types.REQUEST_PROJECTS };
}

export function receiveProjects(projects) {
  return { type: types.RECEIVE_PROJECTS, projects: projects };
}

export function handleRemoveItem(itemId) {
  return (dispatch, getState, firebase) => {
    const itemsRef = firebase.database.ref(
      "/items/" + getState().ui.user.uid + "/" + itemId
    );
    itemsRef.remove();
  };
}

export function loadItems() {
  return (dispatch, getState, firebase) => {
    const user = getState().ui.user;
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
    type: types.EDIT_ITEM_FIELD,
    name: event.target.name,
    value: event.target.value
  };
}

export function selectProject(event, value) {
  event.preventDefault();
  return {
    type: types.EDIT_ITEM_FIELD,
    name: "project",
    value: value
  };
}

export function registerDailyWork(date) {
  return dispatch => {
    dispatch(setActiveHMenuItem("erfassung"));
    return {
      type: types.REGISTER_DAILY_WORK,
      date: date
    };
  };
}
