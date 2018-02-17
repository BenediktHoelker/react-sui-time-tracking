import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import auth from "./auth";
import categorization from "./categorization";
import records from "./records";
import dailyAdditions from "./dailyAdditions";
import ui from "./ui";

const rootReducer = combineReducers({
  auth,
  categorization,
  form,
  records,
  dailyAdditions,
  ui
});

export default rootReducer;
