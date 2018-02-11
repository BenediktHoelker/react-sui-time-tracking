import { combineReducers } from 'redux';
import auth from './auth';
import categorization from './categorization';
import records from './records';
import ui from './ui';

const rootReducer = combineReducers({
  auth,
  categorization,
  records,
  ui
});

export default rootReducer;