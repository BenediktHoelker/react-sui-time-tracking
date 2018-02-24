import { categorization } from "./initialState";
import {
  REQUEST_PROJECTS,
  RECEIVE_PROJECTS,
  REQUEST_SUB_PROJECTS,
  RECEIVE_SUB_PROJECTS,
  REQUEST_TASKS,
  RECEIVE_TASKS,
  REQUEST_ACTIVITIES,
  RECEIVE_ACTIVITIES
} from "../actions/actionTypes";

export default function categorizationReducer(state = categorization, action) {
  switch (action.type) {
    case REQUEST_ACTIVITIES:
      return {
        ...state,
        activitiesLoading: true
      };
    case RECEIVE_ACTIVITIES:
      return {
        ...state,
        activities: action.activities,
        activitiesLoading: false
      };
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
    case REQUEST_SUB_PROJECTS:
      return {
        ...state,
        subProjectsLoading: true
      };
    case RECEIVE_SUB_PROJECTS:
      return {
        ...state,
        subprojects: action.subprojects,
        subProjectsLoading: false
      };
    case REQUEST_TASKS:
      return {
        ...state,
        tasksLoading: true
      };
    case RECEIVE_TASKS:
      return {
        ...state,
        tasks: action.tasks,
        tasksLoading: false
      };
    default:
      return state;
  }
}
