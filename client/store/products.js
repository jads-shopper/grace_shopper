import axios from 'axios'
import history from '../history'
import {fetchCategories} from './categories'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const POST_PRODUCT = 'POST_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'


/**
 * INITIAL STATE
 */
const productState = []

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_PRODUCTS, products})
const makeProduct = product => ({type: POST_PRODUCT, product})
const editProductAction = product => ({type: EDIT_PRODUCT, product})

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
				return newProduct
			})
			.then((theNewProduct) => {
				dispatch(makeProduct(theNewProduct))
				//refresh products so new product has relation to categories
				return axios.get('/api/products')
					.then(res => res.data)
					.then(products => {
						const action = getProducts(products)
						dispatch(action)
					})
			})
			//refresh categories so the categories have a relation to the new product
			.then(() => {
				dispatch(fetchCategories())
				history.push('/admin')
			})
	}
}

export function editProduct (product, categoryArray) {
	return function thunk (dispatch) {
		return axios.put(`/api/products/${product.id}`, product)
			.then(res => res.data)
			.then(targetProduct => {
				const action = editProductAction(targetProduct)
				dispatch(action)
				//find a way to deal with updating product categories
				history.push('/admin')
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
	case EDIT_PRODUCT:
		return state.filter(product => Number(product.id) !== Number(action.product.id)).concat(action.product)
	default:
		return state
	}
}
