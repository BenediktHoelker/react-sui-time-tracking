import initialState from './initialState';
import {TOGGLE_NAVBAR} from '../actions/actionTypes';

export default function uiState(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_NAVBAR:
      return Object.assign({}, state, {
        isNavbarVisible: !state.isNavbarVisible
      })
    default:
      return state
  }
}