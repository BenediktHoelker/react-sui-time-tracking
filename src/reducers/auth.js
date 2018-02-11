import { auth } from "./initialState";
import {
  RECEIVE_LOGIN,
  REQUEST_LOGIN,
  RECEIVE_LOGOUT,
  LOGIN_ERROR
} from "../actions/actionTypes";

export default function authReducer(state = auth, action) {
  switch (action.type) {
    case RECEIVE_LOGIN:
      return {
        ...state,
        loginIsLoading: false,
        user: action.user
      };
    case REQUEST_LOGIN:
      return {
        ...state,
        loginIsLoading: true
      };
    case RECEIVE_LOGOUT:
      return {
        ...state,
        user: null
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loginIsLoading: false,
        user: null
      };
    default:
      return state;
  }
}
