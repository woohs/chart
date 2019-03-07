import { SOCKET_MESSAGE } from '../actions/chart';

export default function chart(state={
  message: [],
  type: [],
  username: [],
  time: [],
}, action){
  switch (action.type) {
    case SOCKET_MESSAGE:
      return handleData(state, action.payload)
    default:
      return state
  }
}

function handleData(state, data){
  return {
    ...state,
    username: [...state.username, data.username],
    type: [...state.type, data.type],
    message: [...state.message, data.message],
    time: [...state.time, data.time],
  }
}