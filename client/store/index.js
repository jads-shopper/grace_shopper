import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user'
import users from './users'
import products from './products'
import categories from './categories'

const reducer = combineReducers({user, products, categories, users})
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware)

export default store
export * from './users'
export * from './categories'
export * from './user'
export * from './products'
