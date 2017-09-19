
/**
 * ACTION TYPES
 */
const WRITE_TITLE = 'WRITE_TITLE'
const WRITE_TEXT = 'WRITE_TEXT'
const SET_RATING = 'SET_RATING'

/**
 * INITIAL STATE
 */
const newReviewState = {
	title: '',
	text: '',
	rating: 1
}

/**
 * ACTION CREATORS
 */
export function writeTitle (title) {return {type: WRITE_TITLE, title}}
export function writeText (text) {return {type: WRITE_TEXT, text}}
export function setRating (rating) {return {type: WRITE_TEXT, rating}}

/**
 * THUNK CREATORS
 */

export function postReview () {

	// return function thunk (dispatch) {
	// 	return axios.get('/api/products')
	// 		.then(res => res.data)
	// 		.then(products => {
	// 			dispatch(getProducts(products))
	// 		})
	// }
}

/**
 * REDUCER
 */
export default function (state = newReviewState, action) {
	switch (action.type) {
	case WRITE_TITLE:
		return Object.assign({}, state, { title: action.title })
	case WRITE_TEXT:
		return Object.assign({}, state, { text: action.text })
	case SET_RATING:
		return Object.assign({}, state, { rating: action.rating })
	default:
		return state
	}
}
