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
    const recordsRef = firebase.database.ref(
      "/items/" + getState().ui.user.uid + "/" + itemId
    );
    recordsRef.remove();
  };
}

export function loadRecords() {
  return (dispatch, getState, firebase) => {
    const user = getState().ui.user;
    const recordsRef = firebase.database.ref("items/" + user.uid);

    recordsRef.on("value", snapshot => {
      let records = snapshot.val();
      let newState = [];
      for (let record in records) {
        newState.push({
          id: record,
          project: records[record].project,
          subproject: records[record].subproject,
          scope: records[record].scope,
          task: records[record].task,
          description: records[record].description,
          date: records[record].date,
          timeStart: records[record].timeStart,
          timeEnd: records[record].timeEnd,
          timeSpent: records[record].timeSpent
        });
      }

      dispatch(setRecords(newState));
    });
  };
}

export function setRecords(records) {
  return { type: types.SET_ITEMS, records: records };
}

export function submitRecord(event) {
  return (dispatch, getState, firebase) => {
    event.preventDefault();

    const state = getState();
    const userId = state.ui.user.uid;
    const workItem = state.data.workItem;

    const recordsRef = firebase.database.ref("items/" + userId);

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
    const record = {
      ...workItem,
      ...{
        timeSpent: timeSpent
      }
    };

    if (record.id) {
      // Edit
      const key = "/items/" + userId + "/" + record.id;
      firebase.database.ref(key).set(record);
    } else {
      // Create
      recordsRef.push(record);
    }

    //dispatch(addItem(item));
  };
}

export function addRecord(record) {
  return { type: types.ADD_ITEM, record: record };
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
    return dispatch(setWorkItemDate(date));
  };
}

export function setWorkItemDate(date) {
  return { type: types.REGISTER_DAILY_WORK, date: date };
}
