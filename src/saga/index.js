import { all, fork } from 'redux-saga/effects'
import watchSocketSaga from './socketSaga';

export default function* rootSaga(){
  yield all([
    watchSocketSaga(),
  ])
}