import initialState from './initialState';
import {TOGGLE_NAVBAR, RECEIVE_LOGIN, RECEIVE_LOGOUT, REQUEST_PROJECTS, RECEIVE_PROJECTS} from '../actions/actionTypes';

export default function uiState(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_NAVBAR:
      return {
        ...state,
        isNavbarVisible: !state.isNavbarVisible
      }
    case RECEIVE_LOGIN:
      return {
        ...state,
        user: action.user
      }
    case RECEIVE_LOGOUT:
      return {
        ...state,
        user: null
      }
    case REQUEST_PROJECTS:
      return {
        ...state,
        projectsLoading: true
      }
    case RECEIVE_PROJECTS:
      return {
        ...state,
        projects: action.projects,
        projectsLoading: false
      }
    default:
      return state
  }
}