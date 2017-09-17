/**
 * ACTION TYPES
 */
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

/**
 * INITIAL STATE
 */

const cartState = []

/**
 * ACTION CREATORS
 */

const addToCart = product => ({type: ADD_TO_CART, product})
const removeFromCart = product => ({type: REMOVE_FROM_CART, product})

/**
 * REDUCER
 */

export default function (state = cartState, action) {
	switch (action.type) {
	case ADD_TO_CART:
		return state.concat(action.product)
	case REMOVE_FROM_CART:
		return state.concat
	}
}




