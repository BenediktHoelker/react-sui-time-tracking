import { ui } from "./initialState";
import {
  TOGGLE_NAVBAR,
  SIDEBAR_SET_ACTIVE_ITEM,
  MENU_SET_ACTIVE_ITEM
} from "../actions/actionTypes";

export default function uiReducer(state = ui, action) {
  switch (action.type) {
    case TOGGLE_NAVBAR:
      return {
        ...state,
        sidebarIsVisible: !state.sidebarIsVisible
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
