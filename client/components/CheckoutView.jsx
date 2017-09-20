import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Grid, Alert} from 'react-bootstrap'
import {postOrder, resetCart} from './../store'
import axios from 'axios'
import history from '../history'

export class CheckoutView extends Component {
	constructor(props) {
		super(props)

		this.state = {
		    email: '',
			firstName: '',
			lastName: '',
			phoneNumber: '',
			address: '',
			city: '',
			state: 'NY',
			country: 'USA',
			zipcode: '',
			shipping: 'standard',
			invalid: null
		}

		this.cart = Object.keys(this.props.cart).map((id) => {
			return {id: id, ...this.props.cart[id]}
		})

		this.handleChange = this.handleChange.bind(this)
		this.calcTotal = this.calcTotal.bind(this)
		this.onCheckout = this.onCheckout.bind(this)
		this.renderEmailInput = this.renderEmailInput.bind(this)
		this.renderAlert = this.renderAlert.bind(this)
		this.validateState = this.validateState.bind(this)
	}

	componentDidUpdate() {
		window.scrollTo(0, 0)
	}


	componentWillReceiveProps(nextProps) {
		axios.post('/api/cart', nextProps.cart)
			.catch(console.error)
	}

	calcTotal() {
		return Object.keys(this.cart)
			.map((product) => this.cart[product].price * this.cart[product].quantity)
			.reduce((acc, curr) => acc + curr, 0)
	}

	handleChange(e) {
		this.setState({[e.target.name]: e.target.value})
	}

	renderEmailInput() {
		if(!this.props.user.hasOwnProperty('id')) {
			return (
				<div>
					<input onChange={this.handleChange} type="email" name="email" value={this.state.email} id="email-address" placeholder="Email Address" data-trigger="change" data-validation-minlength="1" data-type="email" data-required="true" data-error-message="Enter a valid email address."/>
				</div>
			)
		} else {
			return (
				<div>
					<input disabled onChange={this.handleChange} type="email" name="email" placeholder={this.props.user.email} value={this.state.email} id="email-address" data-trigger="change" data-validation-minlength="1" data-type="email" data-required="true" data-error-message="Enter a valid email address."/>
				</div>
			)
		}
	}

	renderAlert() {
		if(this.props.orderStatus === 'success') {
			return (
				<Alert bsStyle="success">
					<strong>Success</strong> Your order was created :)
				</Alert>
			)
		} else if(this.props.orderStatus === 'fail') {
			return (
				<Alert bsStyle="danger">
					<strong>Error</strong> Something went wrong :(
				</Alert>
			)
		}
	}

	validateState() {
		var validationArr = []
		var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

		validationArr.push(emailRegex.test(this.state.email))
		validationArr.push(this.state.address.length >= 1)
		validationArr.push(this.state.phoneNumber.length >= 10)
		validationArr.push(this.state.firstName.length >= 1)
		validationArr.push(this.state.lastName.length >= 1)
		validationArr.push(this.state.city.length >= 1)
		validationArr.push(this.state.zipcode.length === 5)

		for (var i = 0; i < validationArr.length; i++) {
			if(!validationArr[i]) {
				console.log('form invalid')
				this.setState({invalid: true})
				return false
			}
		}
		this.setState({invalid: false})
		return true

	}

	onCheckout() {
		// pass order and product into handleCheckout
		if(!this.validateState()) return

		const {address, city, state, country, zipcode} = this.state
		const order = {
			shippingAddress: `${address}, ${city}, ${state}, ${zipcode}, ${country}`,
			userId: null,
			fulfilled: false
		}

		if(this.props.user.hasOwnProperty('id')) {
			order.userId = this.props.user.id
		}

		const productArr = Object.keys(this.cart).map((id) => {
			return {id: id, ...this.cart[id]}
		})

		this.props.handleCheckout(order, productArr)

	}

	// TODO: render fixed input with user's email value if authenticated user
	// TODO: remove email label popup when focused
	render() {
		return (
		    <Grid>
				{/*<Alert bsStyle="warning">*/}
				{/*<strong>Holy guacamole!</strong> Best check yo self, you're not looking too good.*/}
				{/*</Alert>*/}
				{this.renderAlert()}
				{
					this.state.invalid && (
						<Alert bsStyle="warning">
							<strong>Warning</strong> Please enter valid fields :|
						</Alert>
					)
				}
				<h3>Checkout</h3>
				<div id="wrap">
					<div id="accordian">
						<div className="step" id="step1">
							<div className="number">
								<span>1</span>
							</div>
							<div className="title">
								<h1>Email Address</h1>
							</div>
							<div className="modify">
								<i className="fa fa-plus-circle"></i>
							</div>
						</div>
						<div className="content" id="email">
							<form className="go-right">
								{this.renderEmailInput()}
								{/*<Button onClick={() => this.props.handleLogin('SIGN_IN')}className="have-account" bsStyle="warning">Have an account?</Button>*/}
							</form>
							{/*<a className="continue" href="#">Continue</a>*/}
						</div>
						<div className="step" id="step2">
							<div className="number">
								<span>2</span>
							</div>
							<div className="title">
								<h1>Shipping Information</h1>
							</div>
							<div className="modify">
								<i className="fa fa-plus-circle"></i>
							</div>
						</div>

						<div className="content" id="address">
							<form className="go-right">
								<div>
									<input type="phone" name="phoneNumber" onChange={this.handleChange} value={this.state.phoneNumber} id="telephone" placeholder="Phone number" data-trigger="change" data-validation-minlength="1" data-type="number" data-required="true" data-error-message="Enter Your Telephone Number"/>
								</div>
								<br />
								<div>
									<input type="name" name="firstName" onChange={this.handleChange} value={this.state.firstName} id="first_name" placeholder="First name" data-trigger="change" data-validation-minlength="1" data-type="name" data-required="true" data-error-message="Enter Your First Name"/>
								</div>
								<div>
									<label htmlFor="last_name">Last Name</label>
									<input type="name" name="lastName" onChange={this.handleChange} value={this.state.lastName} id="last_name" placeholder="Last name" data-trigger="change" data-validation-minlength="1" data-type="name" data-required="true" data-error-message="Enter Your Last Name"/>
								</div>
								<div>
									<input type="text" name="address" onChange={this.handleChange} value={this.state.address} id="address" placeholder="Address" data-trigger="change" data-validation-minlength="1" data-type="text" data-required="true" data-error-message="Enter Your Shipping Address"/>
								</div>
								<div>
									<input type="text" name="city" onChange={this.handleChange} value={this.state.city} id="city" placeholder="City" data-trigger="change" data-validation-minlength="1" data-type="text" data-required="true" data-error-message="Enter Your Shipping City"/>
								</div>
								<div>
									<input type="text" name="zipcode" onChange={this.handleChange} value={this.state.zipcode} id="zip" placeholder="Zipcode" data-trigger="change" data-validation-minlength="1" data-type="text" data-required="true" data-error-message="Enter Your Shipping Zip Code"/>
								</div>
								<div>
									<div className="state_options">
										<div className="select">
											<select id="state" onChange={this.handleChange} value={this.state.state}>
												<option value="AL">Alabama</option>
												<option value="AK">Alaska</option>
												<option value="AZ">Arizona</option>
												<option value="AR">Arkansas</option>
												<option value="CA">California</option>
												<option value="CO">Colorado</option>
												<option value="CT">Connecticut</option>
												<option value="DE">Delaware</option>
												<option value="DC">District Of Columbia</option>
												<option value="FL">Florida</option>
												<option value="GA">Georgia</option>
												<option value="HI">Hawaii</option>
												<option value="ID">Idaho</option>
												<option value="IL">Illinois</option>
												<option value="IN">Indiana</option>
												<option value="IA">Iowa</option>
												<option value="KS">Kansas</option>
												<option value="KY">Kentucky</option>
												<option value="LA">Louisiana</option>
												<option value="ME">Maine</option>
												<option value="MD">Maryland</option>
												<option value="MA">Massachusetts</option>
												<option value="MI">Michigan</option>
												<option value="MN">Minnesota</option>
												<option value="MS">Mississippi</option>
												<option value="MO">Missouri</option>
												<option value="MT">Montana</option>
												<option value="NE">Nebraska</option>
												<option value="NV">Nevada</option>
												<option value="NH">New Hampshire</option>
												<option value="NJ">New Jersey</option>
												<option value="NM">New Mexico</option>
												<option value="NY">New York</option>
												<option value="NC">North Carolina</option>
												<option value="ND">North Dakota</option>
												<option value="OH">Ohio</option>
												<option value="OK">Oklahoma</option>
												<option value="OR">Oregon</option>
												<option value="PA">Pennsylvania</option>
												<option value="RI">Rhode Island</option>
												<option value="SC">South Carolina</option>
												<option value="SD">South Dakota</option>
												<option value="TN">Tennessee</option>
												<option value="TX">Texas</option>
												<option value="UT">Utah</option>
												<option value="VT">Vermont</option>
												<option value="VA">Virginia</option>
												<option value="WA">Washington</option>
												<option value="WV">West Virginia</option>
												<option value="WI">Wisconsin</option>
												<option value="WY">Wyoming</option>
											</select>
										</div>
									</div>
								</div>
								<div>
									<div className="country_options">
										<div className="select">
											<select id="country">
												<option value = "USA">United States</option>
											</select>
										</div>
									</div>
								</div>
								{/*<div>*/}
								{/*<input type="checkbox"/>*/}
								{/*<label className="same" htmlFor="same_as_shipping">Same As Shipping Address</label><span></span>*/}
								{/*</div>*/}
							</form>
						</div>

						<div className="step" id="step3">
							<div className="number">
								<span>3</span>
							</div>
							<div className="title">
								<h1>Shipping Method</h1>
							</div>
							<div className="modify">
								<i className="fa fa-plus-circle"></i>
							</div>
						</div>
						<div className="content" id="shipping">
							<div>
								<input checked type="radio" id="standard" value="standard"/><label> Standard <span className="price"> - $4.00</span></label>
							</div>
							{/*<div>*/}
							{/*<input type="radio" id="express" value="standard"/><label> Express <span className="price"> - $8.00</span></label>*/}
							{/*</div>*/}
						</div>

						<div className="step" id="step4">
							<div className="number">
								<span>4</span>
							</div>
							<div className="title">
								<h1>Finalize Order</h1>
							</div>
							<div className="modify">
								<i className="fa fa-plus-circle"></i>
							</div>
						</div>

						<div className="content" id="final_products">
							<div className="left" id="ordered">
								<div className="products">
									{
									    this.cart.length > 0 && this.cart.map((product) => {
									        return (
												<div key={product.id}>
													<div className="product_image">
														{/*<img src="https://i.imgur.com/YwqxBXc.jpg"/>*/}

													</div>
													<div className="product_details">
														<span className="product_name">{product.name}</span>
														<span className="quantity">{product.quantity}</span>
														<span className="price">${product.price}</span>
													</div>
												</div>
											)
										})
									}
									{/*<div>*/}
									{/*<div className="product_image">*/}
									{/*/!*<img src="https://i.imgur.com/YwqxBXc.jpg"/>*!/*/}

									{/*</div>*/}
									{/*<div className="product_details">*/}
									{/*<span className="product_name">Cherry Bikini</span>*/}
									{/*<span className="quantity">1</span>*/}
									{/*<span className="price">$45.00</span>*/}
									{/*</div>*/}
									{/*</div>*/}
								</div>
								<div className="totals">
									<span className="subtitle">Subtotal <span id="sub_price">${this.calcTotal().toFixed(2)}</span></span>
									<span className="subtitle">Tax <span id="sub_tax">$0.00</span></span>
									<span className="subtitle">Shipping <span id="sub_ship">$4.00</span></span>
								</div>
								<div className="final">
									<span className="title">Total <span id="calculated_total">${(this.calcTotal() + 4).toFixed(2)}</span></span>
								</div>
							</div>
							{/*// TODO: Add billing address*/}
							<div className="right" id="reviewed">
								<div className="billing">
									<span className="title">Shipping:</span>
									<div className="address_reviewed">
										<span className="name">{`${this.state.firstName} ${this.state.lastName}`}</span>
										<span className="address">{`${this.state.address}`}</span>
										<span className="location">{`${this.state.city}, ${this.state.country}, ${this.state.zipcode}`}</span>
										<span className="phone">${this.state.phoneNumber}</span>
									</div>
								</div>
								{/*<div className="shipping">*/}
								{/*<span className="title">Shipping:</span>*/}
								{/*<div className="address_reviewed">*/}
								{/*<span className="name">John Smith</span>*/}
								{/*<span className="address">123 Main Street</span>*/}
								{/*<span className="location">Everytown, USA, 12345</span>*/}
								{/*<span className="phone">(123)867-5309</span>*/}
								{/*</div>*/}
								{/*</div>*/}
								<div id="complete">
									{/*<a className="big_Button" id="complete" href="#">Complete Order</a>*/}
									<Button onClick={() => this.onCheckout()} bsStyle="info" bsSize="large">Checkout</Button>
									<span className="sub">By selecting this Button you agree to the purchase and subsequent payment for this order.</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Grid>
		)
	}
}

const mapStateToProps = ({cart, user, orderStatus}) => ({cart, user, orderStatus})

const mapDispatchToProps = (dispatch) => {
	return {
		handleCheckout: (order, productArr) => {
			// pass
			dispatch(postOrder(order, productArr))
			// TODO: Bug, cart will be reset whether or not the order is posted successfully
			dispatch(resetCart())
			console.log('order created')
			// dispatch action to render checkout success/failure message
		},

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutView)


