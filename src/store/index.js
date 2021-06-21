import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { loginReducer } from './loginReducer'
import { createUserReducer } from './createUserReducer'
import { contentReducer } from './contentReducer'

const appReducer = combineReducers({
  loginReducer,
  createUserReducer,
  contentReducer,
})

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT'){
    state = undefined
  }
  return appReducer(state, action)
}

const middlewares = applyMiddleware(thunk, logger)

export const store = createStore(rootReducer, middlewares)