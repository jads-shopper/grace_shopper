import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES'

/**
 * INITIAL STATE
 */
const categoryState = []

/**
 * ACTION CREATORS
 */
const getProducts = categories => ({type: GET_CATEGORIES, categories})

/**
 * THUNK CREATORS
 */

export function fetchCategories () {

	return function thunk (dispatch) {
		return axios.get('/api/categories')
			.then(res => res.data)
			.then(categories => {
				const action = getProducts(categories)
				dispatch(action)
			})
	}
}

/**
 * REDUCER
 */
export default function (state = categoryState, action) {
	switch (action.type) {
	case GET_CATEGORIES:
		return action.categories
	default:
		return state
	}
}