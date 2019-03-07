import { action } from './utils';

export const SOCKET_MESSAGE = "SOCKET_MESSAGE"

/** actionCreators */
export const receiveMessage = action.bind(null, SOCKET_MESSAGE)