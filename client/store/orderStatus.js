// import axios from 'axios'
// import history from '../history'
//
// /**
//  * ACTION TYPES
//  */
// const CREATING_ORDER = 'CREATING_ORDER'
// const SUCCESSFUL_ORDER = 'SUCCESS_ORDER'
// const FAILED_ORDER = 'FAILED_ORDER'
//
// /**
//  * INITIAL STATE
//  */
// const orderState = null
//
// /**
//  * ACTION CREATORS
//  */
// const createOrder = () => ({type: CREATING_ORDER})
// const alertSuccessfulOrder = () => ({type: SUCCESSFUL_ORDER})
// const alertFailedOrder = () => ({type: FAILED_ORDER})
//
//
// export function postOrder (order, productArray) {
// 	console.log('inside postorder', order, productArray)
// 	return function thunk (dispatch) {
// 		return axios.post('/api/orders/admin', order)
// 			.then(res => res.data)
// 			.then(newOrder => {
// 				productArray.forEach(productIdAndQuantity => {
// 					let relationObject = {quantity: productIdAndQuantity.quantity, productId: productIdAndQuantity.id, orderId:newOrder.id}
// 					axios.post('/api/orderProducts', relationObject)
// 				})
// 				return newOrder
// 			})
// 			.then((newOrder) => {
// 				dispatch(makeOrder(newOrder))
// 			})
// 	}
// }
//
// export function editOrder (order) {
// 	return function thunk (dispatch) {
// 		return axios.put(`/api/orders/${order.id}`, order)
// 			.then(res => res.data)
// 			.then(targetOrder => {
// 				const action = editOrderAction(targetOrder)
// 				dispatch(action)
// 				history.push('/admin')
// 			})
// 	}
// }
//
// export function deleteOrder (order) {
//
// 	return function thunk (dispatch) {
// 		return axios.delete(`/api/orders/${order.id}`)
// 			.then(res => res.data)
// 			.then( () => {
// 				dispatch(deleteOrderAction(order))
// 				history.push('/admin')
// 			})
// 	}
// }
//
// /**
//  * REDUCER
//  */
//
// export default function (state = orderState, action) {
// 	switch (action.type) {
// 	case GET_ORDERS:
// 		return action.orders
// 	case POST_ORDER:
// 		return state.concat(action.order)
// 	case EDIT_ORDER:
// 		return state.filter(order => Number(order.id) !== Number(action.order.id)).concat(action.order)
// 	case DELETE_ORDER:
// 		return state.filter(order => Number(order.id) !== Number(action.order.id))
// 	default:
// 		return state
// 	}
// }
