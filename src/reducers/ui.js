import { ui } from "./initialState";
import {
  TOGGLE_NAVBAR,
  RECEIVE_LOGIN,
  REQUEST_LOGIN,
  RECEIVE_LOGOUT,
  SET_ACTIVE_MENU_ITEM_V,
  SET_ACTIVE_MENU_ITEM_H,
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
    case SET_ACTIVE_MENU_ITEM_V:
      return {
        ...state,
        vMenuActiveItem: action.id
      };
    case SET_ACTIVE_MENU_ITEM_H:
      return {
        ...state,
        hMenuActiveItem: action.name
      };
    default:
      return state;
  }
}
