import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const POST_PRODUCT = 'POST_PRODUCT'

/**
 * INITIAL STATE
 */
const productState = []

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_PRODUCTS, products})
const makeProduct = product => ({type: POST_PRODUCT, product})

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

export function postProduct (product, categoryArray) {

	return function thunk (dispatch) {
		return axios.post('/api/products', product)
			.then(res => res.data)
			.then(newProduct => {
				categoryArray.forEach(categoryId => {
					axios.post('/api/productCategories', {productId: newProduct.id, categoryId})
				}) 
				dispatch(makeProduct(newProduct))
				return axios.get('/api/products')
					.then(res => res.data)
					.then(products => {
						const action = getProducts(products)
						dispatch(action)
						history.push('/admin')
					})
			})
	}
}

/**
 * REDUCER
 */
export default function (state = productState, action) {
	switch (action.type) {
	case GET_PRODUCTS:
		return action.products
	case POST_PRODUCT:
		return state.concat(action.product)
	default:
		return state
	}
}
