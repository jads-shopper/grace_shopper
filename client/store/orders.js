import axios from 'axios'

const GET_ORDERS = 'GET_ORDERS'

/**
 * INITIAL STATE
 */
const orderState = []

/**
 * ACTION CREATORS
 */
const getOrders = orders => ({type: GET_ORDERS, orders})


/**
 * THUNK CREATORS
 */

export function fetchOrders (userId) {

	return function thunk (dispatch) {
		return axios.get(`/api/orders/user/${userId}`)
			.then(res => res.data)
			.then(orders => {
				dispatch(getOrders(orders))
			})
	}
}

export default function (state = orderState, action) {
	switch (action.type) {
	case GET_ORDERS:
		return action.orders
	default:
		return state
	}
}
