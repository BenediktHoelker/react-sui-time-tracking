import initialState from './initialState';
import { TOGGLE_NAVBAR, TRIGGER_LOGIN, RECEIVE_LOGIN, TRIGGER_LOGOUT } from '../actions/actionTypes';
import { receiveLogin } from '../actions/uiActions';

export default function uiState(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_NAVBAR:
      return {
        ...state,
        isNavbarVisible: !state.isNavbarVisible
      }
    case TRIGGER_LOGIN:
      return action
    case RECEIVE_LOGIN:
      return {
        ...state,
        user: action.user
      }
    case TRIGGER_LOGOUT:
      return {
        ...state,
        user: null
      }
    default:
      return state
  }
}