import axios from 'axios'

/**
 * ACTION TYPES
 */
const WRITE_TITLE = 'WRITE_TITLE'
const WRITE_TEXT = 'WRITE_TEXT'
const SET_RATING = 'SET_RATING'
const POST_REVIEW = 'POST_REVIEW'

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
export function setRating (starRating) {return {type: SET_RATING, starRating}}

/**
 * THUNK CREATORS
 */

export function postReview (review) {
	console.log('========>', review)

	return function thunk () {
		return axios.post('/api/reviews', review)
			.then(res => res.data)
	}
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
