import * as types from './actionTypes';

export function toggleNavbar(isNavbarVisible) {
  return {type: types.TOGGLE_NAVBAR, isNavbarVisible};
}