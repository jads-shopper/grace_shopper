import React, {Component} from 'react'
import {Button, Grid} from 'react-bootstrap'

export default class CheckoutView extends Component {
	constructor(props) {
		super(props)

		this.state = {
		    email: '',
			shipping: {
		        firstName: '',
				lastName: '',
				phoneNumber: '',
				address: '',
				city: '',
				state: '',
				country: '',
				zipcode: ''
			}

		}
	}

	render() {
		return (
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
							<div>
								<input type="email" name="email" value="" id="email-address" placeholder="Email Address" data-trigger="change" data-validation-minlength="1" data-type="email" data-required="true" data-error-message="Enter a valid email address."/><label htmlFor="email">Email Address</label>
							</div>
							<Button>Login</Button>
							<Button>Create Account</Button>
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
								<input type="name" name="first_name" value="" id="first_name" placeholder="John" data-trigger="change" data-validation-minlength="1" data-type="name" data-required="true" data-error-message="Enter Your First Name"/>
							</div>
							<div>
								<label htmlFor="last_name">Last Name</label>
								<input type="name" name="last_name" value="" id="last_name" placeholder="Smith" data-trigger="change" data-validation-minlength="1" data-type="name" data-required="true" data-error-message="Enter Your Last Name"/>
							</div>
							<div>
								<input type="phone" name="telephone" value="" id="telephone" placeholder="(555)-867-5309" data-trigger="change" data-validation-minlength="1" data-type="number" data-required="true" data-error-message="Enter Your Telephone Number"/>
							</div>
							<div>
								<input type="text" name="address" value="" id="address" placeholder="123 Main Street" data-trigger="change" data-validation-minlength="1" data-type="text" data-required="true" data-error-message="Enter Your Shipping Address"/>
							</div>
							<div>
								<input type="text" name="city" value="" id="city" placeholder="Everytown" data-trigger="change" data-validation-minlength="1" data-type="text" data-required="true" data-error-message="Enter Your Shipping City"/>
							</div>
                            <div>
                                <input type="text" name="zip" value="" id="zip" placeholder="12345" data-trigger="change" data-validation-minlength="1" data-type="text" data-required="true" data-error-message="Enter Your Shipping Zip Code"/>
                            </div>
							<div>
								<div className="state_options">
									<div className="select">
										<select id="state">
											<option value = "1">Alabama</option>
											<option value = "2">Alaska</option>
											<option value = "3">Arkansas</option>
											<option value = "4">Etc.</option>
										</select>
									</div>
								</div>
							</div>
							<div>
								<div className="country_options">
									<div className="select">
										<select id="country">
											<option value = "1">United States</option>
											<option value = "2">United Kingdom</option>
											<option value = "3">Uganda</option>
											<option value = "4">Etc.</option>
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
						<form>
							<div>
								<input type="radio" id="shipping_1" value="1"/>
							</div>			<div>
								<input type="radio" id="shipping_1" value="2"/>
							</div>			<div>
								<input type="radio" id="shipping_1" value="3"/>
							</div>
							{/*<div>*/}
							{/*<input type="radio" id="shipping_2" value="2"/><label htmlFor="shipping_2"> Express Shipping <span className="price">$8.00</span></label>*/}
							{/*</div>*/}
							{/*<div>*/}
							{/*<input type="radio" id="shipping_3" value="3"/><label htmlFor="shipping_3"> Overnight Shipping <span className="price">$12.00</span></label>*/}
							{/*</div>*/}
						</form>
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
								<div className="product_image">
									{/*<img src="https://i.imgur.com/YwqxBXc.jpg"/>*/}

								</div>
								<div className="product_details">
									<span className="product_name">Cherry Bikini</span>
									<span className="quantity">1</span>
									<span className="price">$45.00</span>
								</div>
							</div>
							<div className="totals">
								<span className="subtitle">Subtotal <span id="sub_price">$45.00</span></span>
								<span className="subtitle">Tax <span id="sub_tax">$2.00</span></span>
								<span className="subtitle">Shipping <span id="sub_ship">$4.00</span></span>
							</div>
							<div className="final">
								<span className="title">Total <span id="calculated_total">$51.00</span></span>
							</div>
						</div>
						<div className="right" id="reviewed">
							<div className="billing">
								<span className="title">Shipping:</span>
								<div className="address_reviewed">
									<span className="name">John Smith</span>
									<span className="address">123 Main Street</span>
									<span className="location">Everytown, USA, 12345</span>
									<span className="phone">(123)867-5309</span>
								</div>
							</div>
							<div className="shipping">
								<span className="title">Shipping:</span>
								<div className="address_reviewed">
									<span className="name">John Smith</span>
									<span className="address">123 Main Street</span>
									<span className="location">Everytown, USA, 12345</span>
									<span className="phone">(123)867-5309</span>
								</div>
							</div>
							<div id="complete">
								{/*<a className="big_Button" id="complete" href="#">Complete Order</a>*/}
								<Button>Checkout</Button>
								<span className="sub">By selecting this Button you agree to the purchase and subsequent payment for this order.</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}