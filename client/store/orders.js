import axios from 'axios'
import history from '../history'
import {fetchCategories} from './categories'

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'
const POST_ORDER = 'POST_ORDER'
const EDIT_ORDER = 'EDIT_ORDER'
const DELETE_ORDER = 'DELETE_ORDER'


/**
 * INITIAL STATE
 */
const orderState = []

/**
 * ACTION CREATORS
 */
const getOrders = orders => ({type: GET_ORDERS, orders})
const makeOrder = order => ({type: POST_ORDER, order})
const editOrderAction = order => ({type: EDIT_ORDER, order})
const deleteOrderAction = order => ({type: DELETE_ORDER, order})

/**
 * THUNK CREATORS
 */

export function fetchOrders () {

	return function thunk (dispatch) {
		return axios.get('/api/orders')
			.then(res => res.data)
			.then(orders => {
				dispatch(getOrders(orders))
			})
	}
}

export function postOrder (order) {

	return function thunk (dispatch) {
		return axios.post('/api/orders', order)
			.then(res => res.data)
			// .then(newOrder => {
			// 	// categoryArray.forEach(categoryId => {
			// 	// 	axios.post('/api/productCategories', {productId: newProduct.id, categoryId})
			// 	// })
			// 	//return newProduct
			// })
			.then((newOrder) => {
				dispatch(makeOrder(newOrder))
				history.push('/admin')
			})
	}
}

export function editOrder (order) {
	return function thunk (dispatch) {
		return axios.put(`/api/orders/${order.id}`, order)
			.then(res => res.data)
			.then(targetOrder => {
				const action = editOrderAction(targetOrder)
				dispatch(action)
				history.push('/admin')
			})
	}
}

export function deleteOrder (order) {

	return function thunk (dispatch) {
		return axios.delete(`/api/orders/${order.id}`)
			.then(res => res.data)
			.then( () => {
				dispatch(deleteOrderAction(order))
				history.push('/admin')
			})
	}
}

/**
 * REDUCER
 */
export default function (state = orderState, action) {
	switch (action.type) {
	case GET_ORDERS:
		return action.orders
	case POST_ORDER:
		return state.concat(action.order)
	case EDIT_ORDER:
		return state.filter(order => Number(order.id) !== Number(action.order.id)).concat(action.order)
	case DELETE_ORDER:
		return state.filter(order => Number(order.id) !== Number(action.order.id))
	default:
		return state
	}
}
