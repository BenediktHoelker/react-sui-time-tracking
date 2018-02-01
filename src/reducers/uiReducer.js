import initialState from "./initialState";
import {
  TOGGLE_NAVBAR,
  RECEIVE_LOGIN,
  RECEIVE_LOGOUT,
  REQUEST_PROJECTS,
  RECEIVE_PROJECTS,
  SET_ITEMS,
  SET_ACTIVE_MENU_ITEM_V,
  SET_ACTIVE_MENU_ITEM_H,
  REMOVE_FROM_STATE
} from "../actions/actionTypes";

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
    case REMOVE_FROM_STATE:
      const index = state.items
        .find(item => action.itemId === item.id)
        .map((item, index) => index)
      return {
        ...state,
        items: items.splice(index, 1)
      }
    case SET_ITEMS:
      const items = action.items;
      return {
        ...state,
        items: items,
        nextStartTime: items[items.length - 1]
          ? items[items.length - 1].timeEnd
          : new Date().toLocaleTimeString(),
        workItem: items[0] ? items[0] : {}
      }
    case SET_ACTIVE_MENU_ITEM_V:
      const selectedItem = state.items.find(item => item.id === action.Id);
      return {
        ...state,
        vMenuActiveItem: action.Id,
        workItem: selectedItem ? selectedItem : {}
      }
    case SET_ACTIVE_MENU_ITEM_H:
      return {
        ...state,
        hMenuActiveItem: action.name
      }
    default:
      return state
  }
}
