import axios from 'axios'
import history from '../history'
import {postUser} from './users'

/**
 * ACTION TYPES
 */
const SET_USER = 'SET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultState = {
	user: {}
}

/**
 * ACTION CREATORS
 */
const setUser = user => ({type: SET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const getMe = () =>
	dispatch =>
		axios.get('/auth/me')
			.then(res =>
				dispatch(setUser(res.data || defaultState)))
			.catch(err => console.log(err))

export const login = (credentials) =>
	dispatch =>
		axios.post('auth/login', credentials)
			.then(res => res.data)
			.then((user) => {
				dispatch(setUser(user))
			})
			.catch(error =>{
				console.log(error)
			})


export const signup = (credentials) =>
	dispatch =>
		axios.post('auth/signup', credentials)
			.then(res => res.data)
			.then((user) => {
				dispatch(setUser(user))
				dispatch(postUser(user))
				// history.push('/home')
			})
			.catch(error =>
				console.log(error))


export const logout = () =>
	dispatch =>
		axios.post('/auth/logout')
			.then(res => {
				dispatch(removeUser())
				// history.push('/login')
			})
			.catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultState, action) {
	switch (action.type) {
	case SET_USER:
		return action.user
	case REMOVE_USER:
		return defaultState
	default:
		return state
	}
}
