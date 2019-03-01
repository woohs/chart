import { USER_LOGIN, USER_LOGOUT } from '../actions/login'

export default function userLogin(state = {username: ''}, action){
  switch(action.type){
    case USER_LOGIN:
      return {...state, username: action.name}
    case USER_LOGOUT:
      return {...state, username: ''}
    default:
      return state
  }
}