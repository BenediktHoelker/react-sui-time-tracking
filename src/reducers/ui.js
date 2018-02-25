import { ui } from "./initialState";
import {
  TOGGLE_NAVBAR,
  SIDEBAR_SET_ACTIVE_ITEM,
  MENU_SET_ACTIVE_ITEM,
  ENTER_SEARCH_TERM,
  SELECT_SEARCH_SCOPE
} from "../actions/actionTypes";

export default function uiReducer(state = ui, action) {
  switch (action.type) {
    case ENTER_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.searchTerm
      };
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
    case SELECT_SEARCH_SCOPE:
      return {
        ...state,
        searchScope: action.scope
      };
    default:
      return state;
  }
}
