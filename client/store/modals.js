const SET_MODAL = 'SET_MODAL'
const REMOVE_MODAL = 'REMOVE_MODAL'

//initial state

const currentModal = ''

//action creators

export const setModal = modal => ({type: SET_MODAL, modal})
export const removeModal = () => ({type: REMOVE_MODAL})

//reducer
export default (state = currentModal, action) => {
	switch(action.type){
	case SET_MODAL:
		return action.modal
	case REMOVE_MODAL:
		return ''
	default:
		return state
	}
}


