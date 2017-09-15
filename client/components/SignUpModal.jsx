import React from 'react'
import {Modal, Form, FormGroup, Col, FormControl, Button, ControlLabel} from 'react-bootstrap'
import {connect} from 'react-redux'
import {removeModal, signup } from '../store'

class SignUp extends React.Component {
	constructor (props){
		super(props)
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: ''
		}
		this.onHandleChange = this.onHandleChange.bind(this)
	}

	onHandleChange(evt){
		evt.preventDefault()
		let newState = {}
		newState[evt.target.name] = evt.target.value
		console.log(newState)
		this.setState(newState)
		console.log('STATE', this.state)
	}

	render() {

		return (

			<Modal bsSize="small" show = {true} onHide = {() => {
				this.props.handleRemoveModal()}} >
				<Modal.Header closeButton>
					<Modal.Title>Sign In</Modal.Title>
				</Modal.Header>
				<Form horizontal onSubmit = {() => {
					console.log('SUBMIT')
					this.props.handleSubmit(this.state)}}>
					<Modal.Body>

						<FormGroup controlId="formHorizontalEmail">
							<Col componentClass={ControlLabel} sm={2}>
					First Name
							</Col>
							<Col sm={10}>
								<FormControl type="text" placeholder="First Name" name = "firstName" onChange = {this.onHandleChange} />
							</Col>
						</FormGroup>

						<FormGroup controlId="formHorizontalEmail">
							<Col componentClass={ControlLabel} sm={2}>
					Last Name
							</Col>
							<Col sm={10}>
								<FormControl type="text" placeholder="Last Name" name = "lastName" onChange = {this.onHandleChange} />
							</Col>
						</FormGroup>

						<FormGroup controlId="formHorizontalEmail">
							<Col componentClass={ControlLabel} sm={2}>
					Email
							</Col>
							<Col sm={10}>
								<FormControl type="email" placeholder="Email" name = "email" onChange = {this.onHandleChange} />
							</Col>
						</FormGroup>

						<FormGroup controlId="formHorizontalPassword">
							<Col componentClass={ControlLabel} sm={2}>
					Password
							</Col>
							<Col sm={10}>
								<FormControl type="password" placeholder="Password" name = "password" onChange = {this.onHandleChange} />
							</Col>
						</FormGroup>
					</Modal.Body>
					<Modal.Footer>
						<FormGroup>
							<Col smOffset={2} sm={10}>
								<Button type="submit">
								Sign Up
								</Button>
							</Col>
						</FormGroup>
						<FormGroup>
							<Col smOffset={2} sm={10}>
								<Button bsStyle="danger">
						Sign in with Google
								</Button>
							</Col>
						</FormGroup>
					</Modal.Footer>
				</Form>
			</Modal>

		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleRemoveModal() {
			dispatch(removeModal())
		},

		handleSubmit(credentials) {
			dispatch(signup(credentials))
		}
	}
}

export default connect(state => state, mapDispatchToProps)(SignUp)
