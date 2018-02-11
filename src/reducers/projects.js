import { projects } from "./initialState";
import {
  REQUEST_PROJECTS,
  RECEIVE_PROJECTS
} from "../actions/actionTypes";

export default function projectReducer(state = projects, action) {
  switch (action.type) {
    case REQUEST_PROJECTS:
      return {
        ...state,
        projectsLoading: true
      };
    case RECEIVE_PROJECTS:
      return {
        ...state,
        collection: action.projects,
        projectsLoading: false
      };
    default:
      return state;
  }
}
