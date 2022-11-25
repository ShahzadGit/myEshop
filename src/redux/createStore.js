import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import rootReducer from './rootReducer'
import thunk from 'redux-thunk'
import rootSaga from './rootSaga'
import createSagaMiddle from 'redux-saga'

const sagaMiddleware = createSagaMiddle();
export const middlewares = [thunk,logger, sagaMiddleware]

export const store = createStore(rootReducer, applyMiddleware(...middlewares))
sagaMiddleware.run(rootSaga)

export default store;