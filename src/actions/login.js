import { action } from "./utils";

export const USER_LOGIN = "USER_LOGIN"
export const USER_LOGOUT = 'USER_LOGOUT'

/** actionCreators */
export const userLogin = action.bind(null, USER_LOGIN)
export const userLogout = action.bind(null, USER_LOGOUT)