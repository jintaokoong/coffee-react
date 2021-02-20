import { applyMiddleware } from '@reduxjs/toolkit';
import { createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './redux/reducers/root-reducer';

const loggerMiddleware = createLogger({
  collapsed: (state, action, log) => !log?.error,
  predicate: (state, action) => true
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware))

export default store;