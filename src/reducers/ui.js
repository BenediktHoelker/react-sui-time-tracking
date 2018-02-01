import { ui } from "./initialState";
import {
  TOGGLE_NAVBAR,
  RECEIVE_LOGIN,
  RECEIVE_LOGOUT,
  SET_ACTIVE_MENU_ITEM_V,
  SET_ACTIVE_MENU_ITEM_H
} from "../actions/actionTypes";

export default function uiState(state = ui, action) {
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
    case SET_ACTIVE_MENU_ITEM_V:
      //const selectedItem = state.data.items.find(item => item.id === action.Id);
      return {
        ...state,
        vMenuActiveItem: action.Id,
        //workItem: selectedItem ? selectedItem : {}
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
