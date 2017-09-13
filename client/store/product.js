import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_CATEGORIES = 'GET_CATEGORIES'

/**
 * INITIAL STATE
 */
const defaultState = {
	products: [],
	categories: ['Computers', 'Mouse Pads', 'Stickers', 'Books', 'Pdf'],
}

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_PRODUCTS, products})
const getProductCategories = categories => ({type: GET_CATEGORIES, categories})

/**
 * THUNK CREATORS
 */

export function fetchProducts () {

	return function thunk (dispatch) {
		return axios.get('/api/products')
			.then(res => res.data)
			.then(products => {
				const action = getProducts(products)
				dispatch(action)
			})
	}
}

export function fetchProductCategories () {

	return function thunk (dispatch) {
		return axios.get('/api/productsCategories')
			.then(res => res.data)
			.then(categories => {
				const action = getProductCategories(categories)
				dispatch(action)
			})
	}
}

/**
 * REDUCER
 */
export default function (state = defaultState, action) {
	switch (action.type) {
	case GET_PRODUCTS:
		return Object.assign({}, state, { products: action.products })
	case GET_CATEGORIES:
		return Object.assign({}, state, { categories: action.categories })
	default:
		return state
	}
}
