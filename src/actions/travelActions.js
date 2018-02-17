import * as types from "./actionTypes"

export function toggleTravel(date) {
  return { type: types.TOGGLE_TRAVEL, date }
}