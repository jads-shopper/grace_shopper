import React from 'react'
import {connect} from 'react-redux'
import {Col, Row, Button, Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import {postOrderCustomer} from '../store'

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
									<li className="productItem" key={product.id}>
										<NavLink to={`/products/${product.id}`}>
											<div className="productImage">
												<img src={`${product.imageURL}`} alt={`${product.name} image`} height="99" width="99" />
											</div>
										</NavLink>
										<div className="productInfo">
											<NavLink to={`/products/${product.id}`}><div><h4>Product: {product.name}</h4></div></NavLink>
											<div><h4>${product.price}</h4></div>
											<select className="form-control" placeholder="select" onChange={() => {}} value={product.quantity}>
												{/*
											TODO: Quantity should max out at the number of remaining items and prevent adding to cart if exceeds remaining
											TODO: Quantity should be reduced when adding to cart
											*/}
												{
													[...Array(product.quantity + 20)]
														.map((x, index) => index)
														.filter((index) => index !== 0)
														.map((quantity) => <option key={quantity} value={quantity}>{quantity}</option>)
												}
											</select>
										</div>
										<Button bsStyle="success" className="catalogButton" onClick={() => {alert('Feature not yet implemented!')}}>Remove</Button>
									</li>
								)
							})
							}
						</ul>
					</Col>
					<Col xs={4} sm={4}>
						<div id = "checkoutTotals">
							<h4>Subtotal: </h4>
							<h4>Shipping: </h4>
							<h4>Tax: </h4>
							<h3>Order Total: </h3>

							<Button bsStyle = "success" bsSize = "large" block onClick = {() => {
								this.onSubmit()
							}}>Submit Order!</Button>

						</div>
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
			dispatch(postOrderCustomer(order, cart))
		}
	}
}

const CheckOutViewContainer = connect(mapStateToProps, mapDispatch)(CheckOutView)

export default CheckOutViewContainer





