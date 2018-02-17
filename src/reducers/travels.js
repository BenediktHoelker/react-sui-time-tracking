import { travels } from "./initialState";
import { TOGGLE_TRAVEL } from "../actions/actionTypes";

export default function travelReducer(state = travels, action) {
  switch (action.type) {
    case TOGGLE_TRAVEL:
      const dateId = action.date;
      const dateToUpdate = state.byId[action.date]
        ? state.byId[action.date]
        : { travel: false };
      const isTravel = !dateToUpdate.travel;
      return {
        ...state,
        allIds: state.byId[action.date]
          ? state.allIds
          : state.allIds.concat(dateId),
        byId: {
          ...state.byId,
          [action.date]: { travel: isTravel }
        }
      };
    default:
      return state;
  }
}
