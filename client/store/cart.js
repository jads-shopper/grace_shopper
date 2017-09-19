import axios from 'axios'
/**
 * ACTION TYPES
 */
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const REMOVE_CART = 'REMOVE_CART'
const UPDATE_CART = 'UPDATE_CART'
const LOAD_CART_FROM_SESSION = 'LOAD_CART_FROM_SESSION'

/**
 * INITIAL STATE
 */

const cartState = []

/**
 * ACTION CREATORS
 */

export const addToCart = (product, quantity) => ({type: ADD_TO_CART, product, quantity})
export const removeFromCart = (product) => ({type: REMOVE_FROM_CART, product})
export const removeCart = () => ({type: REMOVE_CART})
export const updateCart = (product, quantity) => ({type: UPDATE_CART, product, quantity})
export const loadSessionCart = (cart) => ({type: LOAD_CART_FROM_SESSION, cart})

/**
 * REDUCER
 */


export default function (state = cartState, action) {
	switch (action.type) {
	case ADD_TO_CART:
		const productKey = action.product.id
		var priorQuantity
		if (state.hasOwnProperty(productKey)) {
			priorQuantity = state[productKey].quantity
		} else {
			priorQuantity = 0
		}
		const cartObject =
			{
				id: action.product.id,
				name: action.product.name,
				quantity: priorQuantity + action.quantity,
				price: action.product.price,
				imageUrl: action.product.imageUrl,

			}
		let newState = [...state, cartObject ]
		return newState
		//return {...state, ...action.product, ...{quantity: action.quantity}}
	case REMOVE_FROM_CART:
		delete newState[action.product.id]
		return newState
	case REMOVE_CART:
		newState = []
		return newState
	case UPDATE_CART:
		newState[action.product.id].quantity = action.quantity
		return newState
	case LOAD_CART_FROM_SESSION:
		console.log('inside cart reducer for session cart', action.cart)
		return action.cart
	default:
		return state
	}
}

export const postCartSession = (cart) => {
	return function() {
		axios.post('/api/cart', cart)
			.then((response) => {
				console.log('SESSION',response)
			})
			.catch(console.error)
	}
}

export const fetchCartSession = () => {
	return function(dispatch) {
		axios.get('/api/cart')
			.then((response) => {
				console.log('cart from session', response.data)
				// dispatch update cart
				dispatch(loadSessionCart(response.data))
			})
			.catch(console.error)
	}
}




