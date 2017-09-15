import React from 'react'
import SignInModal from './SignInModal.jsx'
import SignUpModal from './SignUpModal.jsx'
import {connect} from 'react-redux'
import * as actions from '../store'

const ModalConductor = props => {
	switch (props.currentModal) {
	case 'SIGN_IN':
		return <SignInModal {...props} />
	case 'SIGN_UP':
		return <SignUpModal {...props} />
	default:
		return null
	}
}

export default connect(state => state, () => actions)(ModalConductor)
