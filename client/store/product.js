import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'

/**
 * INITIAL STATE
 */
const defaultState = {
	products: []
}

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_PRODUCTS, products})

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

/**
 * REDUCER
 */
export default function (state = defaultState, action) {
	switch (action.type) {
	case GET_PRODUCTS:
		return Object.assign({}, state, { products: action.products })
	default:
		return state
	}
}
