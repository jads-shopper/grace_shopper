import React, {Component} from 'react'
import AllProducts from './Home.jsx'
import {fetchOrders, getMe} from '../store'
import {connect} from 'react-redux'
import {PageHeader, Col, Row} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

class UserOrders extends Component {
	constructor ( props ) {
		super(props)

	}

	componentDidMount(){
		this.props.renderOrders(this.props.user.id)
	}

	render() {
		console.log('ORDERS', this.props.orders, 'USERID', this.props.user.id)
		if (this.props.orders.length && this.props.user.id) {
			return (
				<div id = "orderRow">
					<Row>
						<Col xs={12} xsOffset={3}>
							<PageHeader>Your Orders </PageHeader>
							{this.props.orders.map((order) => {
								return (
									<div id = "order" key = {order.id}>
										<h2>Order Placed: {order.orderDate}</h2>
										<ul className="list-unstyled">
											{order.products.map((product) => {
												return (
													<li key={product.id}>
														<NavLink to={`/products/${product.id}`}>
															<div className="productImage">
																<img src={`${product.imageUrl}`} alt={`${product.name} image`} height="99" width="99" />
															</div>
														</NavLink>
														<div className="productInfo">
															<NavLink to={`/products/${product.id}`}><div><h4>Product: {product.name}</h4></div></NavLink>
															<div><h4>${product.price}</h4></div>
															<div><h5>Amount Remaining: {product.quantity}</h5></div>
														</div>
													</li>
												)})}
										</ul>
									</div>
								)})}
						</Col>
					</Row>
				</div>
			)
		} else {
			return (
				<h1>test</h1>
			)
		}
	}
}



const mapStateToProps = (state) => {
	return {
		orders: state.orders,
		user: state.user
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		renderOrders (userId) {
			dispatch(fetchOrders(userId))
		},
		renderMe(){
			dispatch(getMe())
		}
	}
}

const UserOrdersContainer = connect(mapStateToProps, mapDispatchToProps)(UserOrders)

export default UserOrdersContainer
