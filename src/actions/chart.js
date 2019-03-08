import { action } from './utils';

export const SOCKET_MESSAGE = "SOCKET_MESSAGE"
export const SEND_MESSAGE = "SEND_MESSAGE"

/** actionCreators */
export const receiveMessage = action.bind(null, SOCKET_MESSAGE)
export const sendMessage = action.bind(null, SEND_MESSAGE)