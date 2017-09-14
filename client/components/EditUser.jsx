import React from 'react'
import {connect} from 'react-redux'
import {Col, Row} from 'react-bootstrap'
import store, {editUser, writeFirstName, writeLastName, adminSelect, writeEmail} from './../store'

const mapStateToProps = function(state) {
	return {
		newUser: state.newUser,
		users: state.users
	}
}

function EditUserForm(props){
	const userId = Number(props.match.params.id)
	const theUser = props.users.filter(user => {
		return user.id === userId
	})[0]
	if(theUser){
		return (
			<Row>
				<Col xs={0} sm={1}>
				</Col>
				<Col xs={12} sm={11}>
					<h3>Editing User {theUser.firstName} {theUser.lastName}.</h3>
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
								defaultValue={theUser.firstName}
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
								defaultValue={theUser.lastName}
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
								defaultValue={theUser.email}
								onChange={props.handleEmail}
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
						<button type="submit" id="submit">Edit User</button>
					</form>
				</Col>
			</Row>
		)
	} else {
		return(
			<Row>
				<Col xs={0} sm={1}>
				</Col>
				<Col xs={12} sm={11}>
					<h3>The user with id:{userId} does not exist.</h3>
					<h5>Or try accessing this view directly from the admin page.</h5>
				</Col>
			</Row>
		)
	}
}

function mapDispatchToProps (dispatch, ownProps){
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
		handleSubmit: function(evt){
			evt.preventDefault()
			dispatch(editUser({id: Number(ownProps.match.params.id) ,firstName: evt.target.firstName.value, lastName: evt.target.lastName.value, email: evt.target.email.value, isAdmin: evt.target.isAdmin.value}))
			dispatch(writeFirstName(''))
			dispatch(writeLastName(''))
			dispatch(adminSelect(false))
			dispatch(writeEmail(''))
		}
	}
}

const EditUserContainer = connect(mapStateToProps, mapDispatchToProps)(EditUserForm)

export default EditUserContainer
