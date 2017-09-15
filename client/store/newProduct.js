
/**
 * ACTION TYPES
 */
const WRITE_PRODUCT_NAME = 'WRITE_PRODUCT_NAME'
const WRITE_IMAGEURL = 'WRITE_IMAGEURL'
const WRITE_PRICE = 'WRITE_PRICE'
const WRITE_DESCRIPTION = 'WRITE_DESCRIPTION'
const WRITE_QUANTITY = 'WRITE_QUANTITY'
const ACTIVE_SELECT = 'ACTIVE_SELECT'

/**
 * INITIAL STATE
 */
const newProductState = {
	name: '',
	imageURL: '',
	price: 0,
	description: '',
	quantity: 0,
	isActive: true
}

/**
 * ACTION CREATORS
 */
export function writeProductName (name) {return {type: WRITE_PRODUCT_NAME, name}}
export function writeImageURL (imageURL) {return {type: WRITE_IMAGEURL, imageURL}}
export function writePrice (price) {return {type: WRITE_PRICE, price: Number(price)}}
export function writeDescription (description) {return {type: WRITE_DESCRIPTION, description}}
export function writeQuantity (quantity) {return {type: WRITE_QUANTITY, quantity: Number(quantity)}}
export function activeSelect (isActive) {return {type : ACTIVE_SELECT, isActive}}

/**
 * REDUCER
 */
export default function (state = newProductState, action) {
	switch (action.type) {
	case WRITE_PRODUCT_NAME:
		return Object.assign({}, state, { name: action.name })
	case WRITE_IMAGEURL:
		return Object.assign({}, state, { imageURL: action.imageURL })
	case WRITE_PRICE:
		return Object.assign({}, state, { price: action.price })
	case WRITE_DESCRIPTION:
		return Object.assign({}, state, { description: action.description })
	case WRITE_QUANTITY:
		return Object.assign({}, state, { quantity: action.quantity })
	case ACTIVE_SELECT:
		return Object.assign({}, state, { isActive: action.isActive })
	default:
		return state
	}
}
