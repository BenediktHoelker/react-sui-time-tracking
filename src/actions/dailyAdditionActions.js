import * as types from "./actionTypes"

export function toggleTravel(date) {
  return { type: types.TOGGLE_TRAVEL, date }
}

export function toggleLeave(date) {
  return { type: types.TOGGLE_LEAVE, date }
}