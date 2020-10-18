import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers';

const middlewares = [thunkMiddleware];

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middlewares)),
);
