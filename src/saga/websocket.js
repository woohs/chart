import { eventChannel} from "redux-saga";
import { call, put, cancelled, take, fork} from "redux-saga/effects";
import { SEND_MESSAGE } from '../actions/chart';
import { watch } from "fs";

/**
 * actionTypes
 */
const ON_OPEN = 'ON_OPEN'
const ON_MESSAGE = 'RECEIVED_MESSAGE'
const ON_CLOSE = 'ON_CLOSE'
const ON_ERROR = 'ON_ERROR'

/**
 * websocket connect promise
 * @param  url 
 */
const wsConnect = (url) => {
  const ws = new WebSocket(url)
  return new Promise((resolve, reject) => {
    resolve(ws)
  })
}

/**
 * 监听WebSocket
 * channel
 */
function webSocketChannel(ws){
  return eventChannel(emitter => {
    ws.onopen = () => {
      console.log('websocket onopen')
      emitter({type: ON_OPEN})
    }

    ws.onmessage = (e) => {
      console.log('received message: ', e.data)
      emitter({type: ON_MESSAGE, payload: JSON.parse(e.data)})
    }

    ws.onerror = (error) => {
      console.log('websocket onerror: ', error)
      emitter({type: ON_ERROR})
    }

    ws.onclose = (e) => {
      console.log('websocket onclose', e);
      emitter({type: ON_CLOSE})
    }

    return () => {
      console.log('close websocket')
      ws.close()
    }
  })
}

function* watchSendMsg(ws){
  const action = yield take(SEND_MESSAGE)
	console.log('TCL: function*watchSendMsg -> action', action)
  
  ws.send(JSON.stringify(action.payload))
}

/**
 * 
 * @param {*} sendData 要发送的数据
 * @param {*} wsUrl 要访问的socket地址
 * @param {*} ReceiveMsgActionType 收到message后，发出的action
 */
function* watchWebSocketSaga(sendData='', wsUrl, ReceiveMsgActionType){
  const ws = yield call(wsConnect, wsUrl)
  const channel = yield call(webSocketChannel, ws)
  yield fork(watchSendMsg, ws)
  try{
    while(true){
      let action = yield take(channel)

      switch (action.type) {
        case ON_OPEN: {
          try{
            ws.send(sendData)

          }catch(e){
            console.log('websocket onopen exception: ', e);
          }
          break
        }
        case ON_MESSAGE:{
          // ws.close()
          const data = 'ok'
          const reducerAction = {type: ReceiveMsgActionType, payload: action.payload}
          yield put(reducerAction)

          break
        } 
        case ON_ERROR: {
          ws.close()
          break
        }
        case ON_CLOSE: {

          break
        }
        default: {
          console.log('websocket default action: ', action)
          break
        }

      }
    }
  }finally{
    if(yield cancelled()){
      channel.close()
      console.log('websocket channel cancelled');
    }
  }
}

export default watchWebSocketSaga