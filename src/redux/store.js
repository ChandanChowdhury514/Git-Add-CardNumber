import { createStore ,applyMiddleware} from 'redux';
//import { configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import rootreducer from './root-reducer';

const middlewares = [reduxThunk];

if(process.env.NODE_ENV === "devlopment") {
    middlewares.push(logger)
}

const store = createStore(rootreducer, applyMiddleware(...middlewares))

export default store;