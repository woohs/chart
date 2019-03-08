import { SOCKET_MESSAGE, SEND_MESSAGE } from '../actions/chart';

export default function chart(state = {
  receive: [],
  send: [],
}, action){
  switch (action.type) {
    case SOCKET_MESSAGE:
      return {
        receive: [...state.receive, action.payload],
        send: [...state.send],
      }
    case SEND_MESSAGE:
      return {
        send: [...state.send, action.payload],
        receive: [...state.receive],
      }
    default:
      return state
  }
}