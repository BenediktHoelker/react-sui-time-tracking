import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import auth from "./auth";
import categorization from "./categorization";
import records from "./records";
import travel from "./travel";
import ui from "./ui";

const rootReducer = combineReducers({
  auth,
  categorization,
  form,
  records,
  travel,
  ui
});

export default rootReducer;
