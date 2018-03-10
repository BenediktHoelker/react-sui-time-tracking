import * as types from "./actionTypes";
import moment from "moment";
import { menuSetActiveItem } from "./uiActions";

export function removeRecord(recordId) {
  return (dispatch, getState, firebase) => {
    const recordsRef = firebase.database.ref(
      "/records/" + getState().auth.user.uid + "/" + recordId
    );
    recordsRef.remove();
  };
}

export function loadRecords() {
  return (dispatch, getState, firebase) => {
    const user = getState().auth.user;
    const recordsRef = firebase.database
      .ref("records/" + user.uid)
      .orderByKey();

    recordsRef.on("value", snapshot => {
      let records = snapshot.val();
      let newState = [];
      for (let record in records) {
        newState.push({
          id: record,
          project: records[record].project,
          subproject: records[record].subproject,
          task: records[record].task,
          activity: records[record].activity,
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
  return { type: types.SET_RECORDS, records: records };
}

export function submitRecord(event) {
  return (dispatch, getState, firebase) => {
    event.preventDefault();

    const state = getState();
    const userId = state.auth.user.uid;
    const newRecord = state.form.newRecordForm.values;

    const dateStart = moment(
      newRecord.date + " " + newRecord.timeStart,
      "DD.MM.YYYY HH:mm:ss"
    );
    const dateEnd = moment(
      newRecord.date + " " + newRecord.timeEnd,
      "DD.MM.YYYY HH:mm:ss"
    );

    const dateDiff = dateEnd.diff(dateStart);
    const timeSpent = moment.utc(dateDiff).format("HH:mm:ss");
    const record = {
      ...newRecord,
      ...{
        timeSpent: timeSpent,
        author: userId
      }
    };

    firebase.firestore.collection("records").add(record);
  };
}

export function setNewRecordStartTime(records) {
  return { type: types.SET_NEW_RECORD_START_TIME, records: records };
}

export function addRecord(record) {
  return { type: types.ADD_RECORD, record: record };
}

export function registerDailyWork(date) {
  return dispatch => {
    dispatch(menuSetActiveItem("erfassung"));
    return dispatch(setNewRecordDate(date));
  };
}

export function setNewRecordDate(date) {
  return { type: types.SET_NEW_RECORD_DATE, date: date };
}
