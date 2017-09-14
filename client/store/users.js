import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USERS = 'GET_USERS'
const POST_USER = 'POST_USER'
const EDIT_USER = 'EDIT_USER'

/**
 * INITIAL STATE
 */
const usersState = []

/**
 * ACTION CREATORS
 */
const getUsers = users => ({type: GET_USERS, users})
const makeUser = user => ({type: POST_USER, user})
const editUserAction = user => ({type: EDIT_USER, user})

/**
 * THUNK CREATORS
 */

export function fetchUsers () {

	return function thunk (dispatch) {
		return axios.get('/api/users')
			.then(res => res.data)
			.then(users => {
				const action = getUsers(users)
				dispatch(action)
			})
	}
}

export function postUser (user) {

	return function thunk (dispatch) {
		return axios.post('/api/users', user)
			.then(res => res.data)
			.then(newUser => {
				dispatch(makeUser(newUser))
				history.push('/admin')
			})
	}
}

export function editUser (user) {
	return function thunk (dispatch) {
		return axios.put(`/api/users/${user.id}`, user)
			.then(res => res.data)
			.then(targetUser => {
				const action = editUserAction(targetUser)
				dispatch(action)
				history.push('/admin')
			})
	}
}

/**
 * REDUCER
 */
export default function (state = usersState, action) {
	switch (action.type) {
	case GET_USERS:
		return action.users
	case POST_USER:
		return state.concat(action.user)
	case EDIT_USER:
		return state.filter(user => Number(user.id) !== Number(action.user.id)).concat(action.user)
	default:
		return state
	}
}