
/**
 * ACTION TYPES
 */
const WRITE_ADDRESS = 'WRITE_ADDRESS'
const WRITE_USERID = 'WRITE_USERID'
const FULFILLED_SELECT = 'FULFILLED_SELECT'

/**
 * INITIAL STATE
 */
const newOrderState = {
	shippingAddress: '',
	userId: 0,
	fulfilled: false
}

/**
 * ACTION CREATORS
 */
export function writeAddress (address) {return {type: WRITE_ADDRESS, address}}
export function writeUserId (userId) {return {type: WRITE_USERID, price: Number(userId)}}
export function fulfilledSelect (fulfilled) {return {type : FULFILLED_SELECT, fulfilled}}

/**
 * REDUCER
 */
export default function (state = newOrderState, action) {
	switch (action.type) {
	case WRITE_ADDRESS:
		return Object.assign({}, state, { address: action.address })
	case WRITE_USERID:
		return Object.assign({}, state, { userId: action.userId })
	case FULFILLED_SELECT:
		return Object.assign({}, state, { fulfilled: action.fulfilled })
	default:
		return state
	}
}
