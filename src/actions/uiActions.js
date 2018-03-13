import * as types from "./actionTypes";

export function enterSearchTerm(searchTerm) {
  return { type: types.ENTER_SEARCH_TERM, searchTerm };
}

export function sidebarSetActiveItem(id) {
  return { type: types.SIDEBAR_SET_ACTIVE_ITEM, id };
}

export function menuSetActiveItem(name) {
  return { type: types.MENU_SET_ACTIVE_ITEM, name };
}

export function toggleNavbar() {
  return { type: types.TOGGLE_NAVBAR };
}

export function selectSearchScope(scope) {
  return { type: types.SELECT_SEARCH_SCOPE, scope };
}