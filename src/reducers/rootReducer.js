import { combineReducers } from 'redux';
import ui from './ui';
//import data from './data';
import records from './records';
import projects from './project';

const rootReducer = combineReducers({
  ui,
  records,
  projects
});

export default rootReducer;