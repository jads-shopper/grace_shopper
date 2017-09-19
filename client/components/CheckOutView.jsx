import React from 'react'
import {connect} from 'react-redux'
import {Col, Row, Button, Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import {postOrder} from '../store'

class CheckOutView extends React.Component {
	constructor (props){
		super(props)
		this.state = {
			address: '',
		}
		this.onHandleChange = this.onHandleChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}

	onHandleChange(e){
		this.setState({
			address: e.target.value
		})
	}

	onSubmit(){
		let cartArr = this.props.cart.map((cart) => {
			return Object.assign({}, {quantity: cart.quantity, id: cart.id})
		})
		this.props.postOrderHandler({shippingAddress: this.state.address}, cartArr)
	}

	render(){

		return(
			<div>
				<Form inline>
					<FormGroup controlId="formInlineName">
						<ControlLabel>Shipping Address</ControlLabel>
						{' '}
						<FormControl type="text" placeholder="Shipping Address" onChange = {this.onHandleChange} />
					</FormGroup>
					{' '}
					<FormGroup controlId="formInlineEmail">
						<ControlLabel>CC#</ControlLabel>
						{' '}
						<FormControl type="email" placeholder="CC#" />
					</FormGroup>
					{' '}
				</Form>

				<Row>
					<Col xs={8} sm={8}>
						<ul className="list-unstyled">
							{this.props.cart.map(product => {
								return (
									<li className="productItem" key={product.product}>
										<NavLink to={`/products/${product.product}`}>
											<div className="productImage">
												<img src={`${product.imageURL}`} alt={`${product.name} image`} height="99" width="99" />
											</div>
										</NavLink>
										<div className="productInfo">
											<NavLink to={`/products/${product.product}`}><div><h4>Product: {product.name}</h4></div></NavLink>
											<div><h4>${product.price}</h4></div>
										</div>
										<Button bsStyle="success" className="catalogButton" onClick={() => {alert('Feature not yet implemented!')}}>Remove</Button>
									</li>
								)
							})
							}
						</ul>
					</Col>
					<Col xs={4} sm={4}>
						<Button onClick = {() => {
							this.onSubmit()
						}}>Submit Order!</Button>
					</Col>
				</Row>

			</div>
		)
	}
}

const mapStateToProps = function(state) {
	return {
		cart: state.cart
	}
}

const mapDispatch = (dispatch) => {
	return {
		postOrderHandler (order, cart) {
			dispatch(postOrder(order, cart))
		}
	}
}

const CheckOutViewContainer = connect(mapStateToProps, mapDispatch)(CheckOutView)

export default CheckOutViewContainer





