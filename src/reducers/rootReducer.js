import { combineReducers } from 'redux';
import ui from './ui';
import data from './data';
import projects from './project';

const rootReducer = combineReducers({
  ui,
  data,
  projects
});

export default rootReducer;