import { combineReducers } from 'redux';
import auth from './auth';
import projects from './project';
import records from './records';
import ui from './ui';

const rootReducer = combineReducers({
  auth,
  projects,
  records,
  ui
});

export default rootReducer;