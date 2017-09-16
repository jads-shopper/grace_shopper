import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_SEARCH = 'GET_SEARCH'

/**
 * INITIAL STATE
 */
const searchState = {query: ''}

/**
 * ACTION CREATORS
 */
export const getSearch = query => ({type: GET_SEARCH , query })

/**
 * THUNK CREATORS
 */


/**
 * REDUCER
 */
export default function (state = searchState, action) {
	switch (action.type) {
	case GET_SEARCH:
		return Object.assign({}, state, { query: action.query })
	default:
		return state
	}
}