import React from 'react';
import { render } from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers/index'
import './index.css';
import App from './containers/App';
import initState from "./initState";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk'
// import * as serviceWorker from './serviceWorker';


const store = createStore(rootReducer, initState, composeWithDevTools(applyMiddleware(thunkMiddleware)));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
