import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import rootReducer from './reducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Main from './page/main';  

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('root')
);
