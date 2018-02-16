import { records } from "./initialState";
import {
  SET_RECORDS,
  SET_NEW_RECORD_DATE,
  SET_NEW_RECORD_START_TIME
} from "../actions/actionTypes";

import moment from "moment";

const getRecordsOfDate = (records, date) => {
  const filteredRecords = records.filter(record => {
    return isSameDate(record.date, date, "day");
  });
  return filteredRecords;
};

const isSameDate = (date1, date2, granularity) => {
  const moment1 = moment(date1, "DD.MM.YYYY");
  const moment2 = moment(date2, "DD.MM.YYYY");
  const isSameDate = moment1.isSame(moment2, granularity);
  return isSameDate;
};

export default function recordReducer(state = records, action) {
  switch (action.type) {
    case SET_NEW_RECORD_DATE:
      return {
        ...state,
        newRecord: {
          ...state.newRecord,
          date: action.date
        }
      };
    case SET_NEW_RECORD_START_TIME:
      const recordsOfDate = getRecordsOfDate(action.records, moment());
      const recordsOfDateCount = recordsOfDate.length;
      const newRecordStartTime =
        recordsOfDate && recordsOfDateCount > 0
          ? recordsOfDate[recordsOfDateCount - 1].timeEnd
          : moment().format("HH:mm");
      return {
        ...state,
        newRecord: {
          ...state.newRecord,
          timeStart: newRecordStartTime
        }
      };
    case SET_RECORDS:
      const records = action.records;
      return {
        ...state,
        collection: records
      };
    default:
      return state;
  }
}
