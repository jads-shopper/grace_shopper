
/**
 * ACTION TYPES
 */
const WRITE_CATEGORY_NAME = 'WRITE_CATEGORY_NAME'

/**
 * INITIAL STATE
 */
const newCategoryState = {
	name: '',
}

/**
 * ACTION CREATORS
 */
export function writeCategoryName (name) {return {type: WRITE_CATEGORY_NAME, name}}

/**
 * REDUCER
 */
export default function (state = newCategoryState, action) {
	switch (action.type) {
	case WRITE_CATEGORY_NAME:
		return Object.assign({}, state, { name: action.name })
	default:
		return state
	}
}
