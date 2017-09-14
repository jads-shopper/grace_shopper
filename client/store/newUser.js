import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const WRITE_FIRSTNAME = 'WRITE_FIRSTNAME'
const WRITE_LASTNAME = 'WRITE_LASTNAME'
const ADMIN_SELECT = 'ADMIN_SELECT'
const WRITE_EMAIL = 'WRITE_EMAIL'
const WRITE_PASSWORD = 'WRITE_PASSWORD'
const POST_USER = 'POST_USER'

/**
 * INITIAL STATE
 */
const newUserState = {
	firstName: '',
	lastName: '',
	isAdmin: false,
	email: '',
	password: ''
}

/**
 * ACTION CREATORS
 */
export function writeFirstName (firstName) {return {type: WRITE_FIRSTNAME, firstName}}
export function writeLastName (lastName) {return {type: WRITE_LASTNAME, lastName}}
export function adminSelect (isAdmin) {return {type: ADMIN_SELECT, isAdmin}}
export function writeEmail (email) {return {type: WRITE_EMAIL, email}}
export function writePassword (password) {return {type: WRITE_PASSWORD, password}}

/**
 * REDUCER
 */
export default function (state = newUserState, action) {
	switch (action.type) {
	case WRITE_FIRSTNAME:
		return Object.assign({}, state, { newFirstName: action.firstName })
	case WRITE_LASTNAME:
		return Object.assign({}, state, { newLastName: action.lastName })
	case ADMIN_SELECT:
		return Object.assign({}, state, { isAdmin: action.isAdmin })
	case WRITE_EMAIL:
		return Object.assign({}, state, { email: action.email })
	case WRITE_PASSWORD:
		return Object.assign({}, state, { password: action.password })
	default:
		return state
	}
}
