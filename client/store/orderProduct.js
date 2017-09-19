import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ORDER_PRODUCTS = 'GET_ORDER_PRODUCTS'


/**
 * INITIAL STATE
 */
const orderProductState = []

/**
 * ACTION CREATORS
 */
const getOrderProducts = orderProducts => ({type: GET_ORDER_PRODUCTS, orderProducts})


/**
 * THUNK CREATORS
 */


export function fetchOrderProducts (orderId) {

	return function thunk (dispatch) {
		return axios.get(`/api/orderProducts/${orderId}`)
			.then(res => res.data)
			.then(orders => {
				dispatch(getOrderProducts(orders))
			})
	}
}

/**
 * REDUCER
 */
export default function (state = orderProductState, action) {
	switch (action.type) {
	case GET_ORDER_PRODUCTS:
		return action.orderProducts
	default:
		return state
	}
}