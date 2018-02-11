import { categorization } from "./initialState";
import { REQUEST_PROJECTS, RECEIVE_PROJECTS, RECEIVE_SUB_PROJECTS, REQUEST_SUB_PROJECTS } from "../actions/actionTypes";

export default function categorizationReducer(state = categorization, action) {
  switch (action.type) {
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
        subProjects: action.subProjects,
        subProjectsLoading: false
      };
    default:
      return state;
  }
}
