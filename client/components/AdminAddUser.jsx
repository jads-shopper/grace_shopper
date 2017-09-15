import React from 'react'
import {connect} from 'react-redux'
import {Col, Row} from 'react-bootstrap'
import {postUser, writeFirstName, writeLastName, adminSelect, writeEmail, writePassword} from './../store'

const mapStateToProps = function(state) {
	return {
		newUser: state.newUser
	}
}

function AddUserForm(props){
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
							name="email"
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
							name="password"
							onChange={props.handlePassword}
						/>
					</div>
					<div className="inputGroup">
						<span>
							<h5>Admin Status</h5>
						</span>
						<select name="isAdmin" className="inputTextBox" onChange={props.handleAdmin}>
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

function mapDispatchToProps (dispatch){
	return {
		handleFirstName: function(evt){
			dispatch(writeFirstName(evt.target.value))
		},
		handleLastName: function(evt){
			dispatch(writeLastName(evt.target.value))
		},
		handleAdmin: function(evt){
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
			dispatch(postUser({firstName: evt.target.firstName.value, lastName: evt.target.lastName.value, email: evt.target.email.value, password: evt.target.password.value, isAdmin: evt.target.isAdmin.value}))
			dispatch(writeFirstName(''))
			dispatch(writeLastName(''))
			dispatch(adminSelect(false))
			dispatch(writeEmail(''))
			dispatch(writePassword(''))
		}
	}
}

const AddUserContainer = connect(mapStateToProps, mapDispatchToProps)(AddUserForm)

export default AddUserContainer
