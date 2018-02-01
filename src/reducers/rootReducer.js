import {combineReducers} from 'redux';
import uiReducer from './uiReducer';
import dataReducer from './dataReducer';

const rootReducer = combineReducers({
  uiReducer,
  dataReducer
});

export default rootReducer;