import * as types from "./actionTypes";
import moment from "moment";
import { menuSetActiveItem } from "./uiActions";

export function removeRecord(recordId) {
  return (dispatch, getState, firebase) => {
    firebase.firestore
      .collection("records")
      .doc(recordId)
      .delete();
  };
}

export function loadRecordsOfMonth(dateOfMonth) {
  const firstDayOfMonth = moment()
    .startOf("month")
    .format("DD.MM.YYYY");
  const lastDayOfMonth = moment()
    .endOf("month")
    .format("DD.MM.YYYY");

  return (dispatch, getState, firebase) => {
    firebase.firestore
      .collection("records")
      .where("date", ">=", firstDayOfMonth)
      .where("date", "<=", lastDayOfMonth)
      .onSnapshot(querySnapshot => {
        const byId = {};
        querySnapshot.forEach(doc => {
          byId[doc.id] = doc.data();
        });
        dispatch(receiveRecords(byId, querySnapshot.docs.map(doc => doc.id)));
      });
  };
}

export function receiveRecords(byId, allIds) {
  return { type: types.RECEIVE_RECORDS, byId: byId, allIds: allIds };
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
