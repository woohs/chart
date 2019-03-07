import { combineReducers } from 'redux';
import login from './login';
import chart from './chart';

export default combineReducers({
  login,
  chart,
})