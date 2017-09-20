import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const CREATING_ORDER = 'CREATING_ORDER'
const SUCCESSFUL_ORDER = 'SUCCESS_ORDER'
const FAILED_ORDER = 'FAILED_ORDER'

/**
 * INITIAL STATE
 */
const orderState = null

/**
 * ACTION CREATORS
 */
export const createOrder = () => ({type: CREATING_ORDER})
export const alertSuccessfulOrder = () => ({type: SUCCESSFUL_ORDER})
export const alertFailedOrder = () => ({type: FAILED_ORDER})


/**
 * REDUCER
 */

export default function (state = orderState, action) {
	switch (action.type) {
	case CREATING_ORDER:
		return 'creating'
	case SUCCESSFUL_ORDER:
		return 'success'
	case FAILED_ORDER:
		return 'fail'
	default:
		return state
	}
}
