import React from 'react'
import { NavLink } from 'react-router-dom'
import {connect} from 'react-redux'

const mapStateToProps = function(state) {
	return {
		products: state.products
	}
}

function AdminView(props){
	if(props.products){
		return (
			<h3>admin stuff</h3>
		)
	} else {
		return(<div>Error</div>)
	}
}

const AdminContainer = connect(mapStateToProps)(AdminView)

export default AdminContainer