import axios from 'axios'
import history from '../history'
import {fetchCategories} from './categories'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const POST_PRODUCT = 'POST_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'


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
const deleteProductAction = product => ({type: DELETE_PRODUCT, product})

/**
 * THUNK CREATORS
 */

export function fetchProducts () {

	return function thunk (dispatch) {
		return axios.get('/api/products')
			.then(res => res.data)
			.then(products => {
				dispatch(getProducts(products))
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
						dispatch(getProducts(products))
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

export function deleteProduct (product) {

	return function thunk (dispatch) {
		return axios.delete(`/api/products/${product.id}`)
			.then(res => res.data)
			.then( () => {
				dispatch(deleteProductAction(product))
			})
			// Refreshing categories to update lack of deleted product
			.then(() => {
				dispatch(fetchCategories())
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
	case DELETE_PRODUCT:
		return state.filter(product => Number(product.id) !== Number(action.product.id))
	default:
		return state
	}
}
