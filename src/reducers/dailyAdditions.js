import { dailyAdditions } from "./initialState";
import { TOGGLE_TRAVEL, TOGGLE_LEAVE } from "../actions/actionTypes";

export default function dailyAdditionsReducer(state = dailyAdditions, action) {
  const dateId = action.date;
  const dateToUpdate = state.byId[action.date]
    ? state.byId[action.date]
    : { travel: false, leave: false };
    
  switch (action.type) {
    case TOGGLE_TRAVEL:
      const isTravel = !dateToUpdate.travel;
      return {
        ...state,
        allIds: state.byId[action.date]
          ? state.allIds
          : state.allIds.concat(dateId),
        byId: {
          ...state.byId,
          [action.date]: { ...state.byId[action.date], travel: isTravel }
        }
      };
    case TOGGLE_LEAVE:
      const isLeave = !dateToUpdate.leave;
      return {
        ...state,
        allIds: state.byId[action.date]
          ? state.allIds
          : state.allIds.concat(dateId),
        byId: {
          ...state.byId,
          [action.date]: { ...state.byId[action.date], leave: isLeave }
        }
      };
    default:
      return state;
  }
}
