import { take, takeEvery, cancel, call, fork, takeLatest } from 'redux-saga/effects'
import socketSaga from "./websocket";
import { USER_LOGIN, USER_LOGOUT } from '../actions/login'
import { SOCKET_MESSAGE } from '../actions/chart';
import { webSocketUrl } from '../config/config'
import { setAuthority } from '../utils/authority';
import createHistory from 'history/createBrowserHistory'
import { message } from 'antd';

const history = createHistory()

function* configWebSocket(data){
  const url = webSocketUrl
  const wsSendData = JSON.stringify({
    type: 'client_join',
    ...data,
  })
  const socketSyncTask = yield fork(socketSaga, wsSendData, url, SOCKET_MESSAGE)
  setAuthority(data.username)
  data.history.push('/app/chart')
  message.success(`欢迎你 ${data.username}`)
  yield take(USER_LOGOUT)
  yield cancel(socketSyncTask)
  setAuthority('')
}

function* userLogout(){
  yield take(USER_LOGOUT)
  setAuthority('')
}

function* watchSocketSaga(){
  yield takeLatest(USER_LOGIN, configWebSocket)
  yield takeLatest(USER_LOGOUT, userLogout)
}

export default watchSocketSaga
