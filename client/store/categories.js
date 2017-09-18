import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES'
const POST_CATEGORY = 'POST_CATEGORY'
const EDIT_CATEGORY = 'EDIT_CATEGORY'

/**
 * INITIAL STATE
 */
const categoryState = []

/**
 * ACTION CREATORS
 */
const getProducts = categories => ({type: GET_CATEGORIES, categories})
const makeCategory = category => ({type: POST_CATEGORY, category})
const editCategoryAction = category => ({type: EDIT_CATEGORY, category})

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

export function postCategory (category) {

	return function thunk (dispatch) {
		return axios.post('/api/categories', category)
			.then(res => res.data)
			.then(newCategory => {
				dispatch(makeCategory(newCategory))
				history.push('/admin')
			})
	}
}

export function editCategory (category) {
	return function thunk (dispatch) {
		return axios.put(`/api/categories/${category.id}`, category)
			.then(res => res.data)
			.then(targetCategory => {
				const action = editCategoryAction(targetCategory)
				dispatch(action)
				history.push('/admin')
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
	case POST_CATEGORY:
		return state.concat(action.category)
	case EDIT_CATEGORY:
		return state.filter(category => Number(category.id) !== Number(action.category.id)).concat(action.category)
	default:
		return state
	}
}