import { data } from "./initialState";
import {
  EDIT_RECORD_FIELD,
  REQUEST_PROJECTS,
  RECEIVE_PROJECTS,
  SET_RECORDS,
  SET_WORKITEM_DATE
} from "../actions/actionTypes";

export default function dataReducer(state = data, action) {
  switch (action.type) {
    case EDIT_RECORD_FIELD: {
      return {
        ...state,
        newRecord: {
          ...state.newRecord,
          [action.name]: action.value
        }
      };
    }
    case REQUEST_PROJECTS:
      return {
        ...state,
        projectsLoading: true
      };
    case RECEIVE_PROJECTS:
      return {
        ...state,
        projects: action.projects,
        projectsLoading: false
      };
    case SET_WORKITEM_DATE:
      return {
        ...state,
        newRecord: {
          ...state.newRecord,
          date: action.date
        }
      };
    case SET_RECORDS:
      const records = action.records;
      return {
        ...state,
        records: records,
        nextStartTime: records[records.length - 1]
          ? records[records.length - 1].timeEnd
          : new Date().toLocaleTimeString()
      };
    default:
      return state;
  }
}
