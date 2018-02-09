import { ui } from "./initialState";
import {
  TOGGLE_NAVBAR,
  RECEIVE_LOGIN,
  REQUEST_LOGIN,
  RECEIVE_LOGOUT,
  SIDEBAR_SET_ACTIVE_ITEM,
  MENU_SET_ACTIVE_ITEM,
  LOGIN_ERROR
} from "../actions/actionTypes";

export default function uiReducer(state = ui, action) {
  switch (action.type) {
    case TOGGLE_NAVBAR:
      return {
        ...state,
        sidebarIsVisible: !state.sidebarIsVisible
      };
    case RECEIVE_LOGIN:
      return {
        ...state,
        loginIsLoading: false,
        user: action.user
      };
    case REQUEST_LOGIN:
      return {
        ...state,
        loginIsLoading: true
      };
    case RECEIVE_LOGOUT:
      return {
        ...state,
        user: null
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loginIsLoading: false,
        user: null
      };
    case SIDEBAR_SET_ACTIVE_ITEM:
      return {
        ...state,
        sidebarActiveItem: action.id
      };
    case MENU_SET_ACTIVE_ITEM:
      return {
        ...state,
        menuActiveItem: action.name
      };
    default:
      return state;
  }
}