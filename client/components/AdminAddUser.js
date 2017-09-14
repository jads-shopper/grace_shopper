import React from 'react'
import {connect} from 'react-redux'
import {Col, Row} from 'react-bootstrap'
import store, {writeFirstName, writeLastName, adminSelect, writeEmail, writePassword} from './../store'

const mapStateToProps = function(state) {
	return {
		newUser: state.newUser
	}
}

function ProductList(props){
	return (
		<Row>
			<Col xs={0} sm={1}>
			</Col>
			<Col xs={12} sm={11}>
				<form id="newUserForm" onSubmit={props.handleSubmit}>
					<div className="">
						<span>
							<h5>First Name</h5>
						</span>
						<input
							className=""
							autoComplete= "off"
							type="text"
							name="firstName"
							onChange={props.handleFirstName}
						/>
					</div>
					<div className="">
						<span>
							<h5>Last Name</h5>
						</span>
						<input
							className=""
							autoComplete= "off"
							type="text"
							name="lastName"
							onChange={props.handleLastName}
						/>
					</div>
					<div className="">
						<span>
							<h5>Email</h5>
						</span>
						<input
							className=""
							autoComplete= "off"
							type="text"
							name="lastName"
							onChange={props.handleEmail}
						/>
					</div>
					<div className="">
						<span>
							<h5>Password</h5>
						</span>
						<input
							className=""
							autoComplete= "off"
							type="text"
							name="lastName"
							onChange={props.handlePassword}
						/>
					</div>
					<div className="inputGroup">
						<span>
							<h5>Admin Status</h5>
						</span>
						<select name="campus" className="inputTextBox" onChange={props.handelAdmin}>
							<option value={false}>False</option>
							<option value={true}>True</option>
						</select>
					</div>
					<button type="submit" id="submit">Create User</button>
				</form>
			</Col>
		</Row>
	)
}

function mapDispatchToProps (dispatch, ownProps){
	return {
		handleFirstName: function(evt){
			dispatch(writeFirstName(evt.target.value))
		},
		handleLastName: function(evt){
			dispatch(writeLastName(evt.target.value))
		},
		handelAdmin: function(evt){
			dispatch(adminSelect(evt.target.value))
		},
		handleEmail: function(evt){
			dispatch(writeEmail(evt.target.value))
		},
		handlePassword: function(evt){
			dispatch(writePassword(evt.target.value))
		},
		handleSubmit: function(evt){
			evt.preventDefault()
			//dispatch(postStudent({firstName: evt.target.firstName.value, lastName: evt.target.lastName.value, campusId: Number(evt.target.campus.value)}, ownProps.history))
			dispatch(writeFirstName(''))
			dispatch(writeLastName(''))
			dispatch(adminSelect(false))
			dispatch(writeEmail(''))
			dispatch(writePassword(''))
		}
	}
}

const ProductContainer = connect(mapStateToProps, mapDispatchToProps)(ProductList)

export default ProductContainer
