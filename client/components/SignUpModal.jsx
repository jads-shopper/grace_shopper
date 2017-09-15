import React from 'react'
import {Modal, Form, FormGroup, Col, FormControl, Button, ControlLabel} from 'react-bootstrap'
import {connect} from 'react-redux'
import {removeModal} from '../store'

const SignUp = props => {

	return (
		<Modal bsSize="small" show = {true} onHide = {() => {
			props.handleRemoveModal()}} >
			<Modal.Header closeButton>
				<Modal.Title>Sign In</Modal.Title>
			</Modal.Header>
			<Modal.Body>

				<Form horizontal>

					<FormGroup controlId="formHorizontalEmail">
						<Col componentClass={ControlLabel} sm={2}>
        First Name
						</Col>
						<Col sm={10}>
							<FormControl type="email" placeholder="Email" />
						</Col>
					</FormGroup>

					<FormGroup controlId="formHorizontalEmail">
						<Col componentClass={ControlLabel} sm={2}>
        Last Name
						</Col>
						<Col sm={10}>
							<FormControl type="email" placeholder="Email" />
						</Col>
					</FormGroup>

					<FormGroup controlId="formHorizontalEmail">
						<Col componentClass={ControlLabel} sm={2}>
        Email
						</Col>
						<Col sm={10}>
							<FormControl type="email" placeholder="Email" />
						</Col>
					</FormGroup>

					<FormGroup controlId="formHorizontalPassword">
						<Col componentClass={ControlLabel} sm={2}>
        Password
						</Col>
						<Col sm={10}>
							<FormControl type="password" placeholder="Password" />
						</Col>
					</FormGroup>

				</Form>
			</Modal.Body>
			<Modal.Footer>
				<FormGroup>
					<Col smOffset={2} sm={10}>
						<Button onClick = {() => {
							props.handleRemoveModal()}} type="submit">
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
		</Modal>

	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleRemoveModal() {
			dispatch(removeModal())
		}
	}
}

export default connect(state => state, mapDispatchToProps)(SignUp)
