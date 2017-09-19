import React, {Component} from 'react'
import AllProducts from './Home.jsx'
import {fetchOrdersUser, getMe} from '../store'
import {connect} from 'react-redux'
import {PageHeader, Col, Row, Table} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

class UserOrders extends Component {
	constructor (props) {
		super(props)

	}

	componentWillMount(){
		this.props.renderOrders(this.props.user.id)
	}

	componentWillReceiveProps(nextProps){
		if (this.props.user.id !== nextProps.user.id){
			this.props.renderOrders(nextProps.user.id)
		}
	}


	render() {
		if (this.props.orders.length && this.props.user.id) {
			return (
				<div id = "orderRow">
					<Row>
						<Col xs={0} sm={1}>
						</Col>
						<Col xs={12} sm={10}>
							<PageHeader>Orders</PageHeader>
						</Col>
					</Row>
					{this.props.orders.map((order) => {
						//Calculating the total of an order
						let orderTotal = 0
						order.products.forEach(product => {
							let quantityCost = product.price * product.orderProduct.quantity
							orderTotal += quantityCost
						})
						return (
							<div key={order.id}>
								<Row>
									<Col xs={0} sm={1}>
									</Col>
									<Col xs={12} sm={10}>
										<h3>Order #{order.id}</h3>
										<span>
											<h5>Total: ${orderTotal}</h5>
										</span>
										<span>
											<h5>Shipping Address: {order.shippingAddress}</h5>
										</span>
										<span>
											<h5>Status: {order.fulfilled ? 'Fulfilled' : 'Unfulfilled'}</h5>
										</span>

									</Col>
								</Row>
								<Row>
									<Col xs={0} sm={1}>
									</Col>
									<Col xs={12} sm={10}>
										<h4>Products</h4>
										<Table striped bordered condensed hover>
											<thead>
												<tr>
													<th>Product #</th>
													<th>Name</th>
													<th>Price</th>
													<th>Quantity</th>
													<th>Active</th>
												</tr>
											</thead>
											<tbody>
												{
													order.products.map(product => {
														return (
															<tr key={product.id} onClick={() => {history.push(`/admin/edit/product/${product.id}`)}}>
																<td>{product.id}</td>
																<td>{product.name}</td>
																<td>${product.price}</td>
																<td>{product.orderProduct.quantity}</td>
																<td>{product.isActive ? 'Yes' : 'No'}</td>
															</tr>
														)
													})
												}
											</tbody>
										</Table>
									</Col>
								</Row>
							</div>
						)})}
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
			if(userId){
				dispatch(fetchOrdersUser(userId))
			}
		},
		renderMe(){
			dispatch(getMe())
		}
	}
}

const UserOrdersContainer = connect(mapStateToProps, mapDispatchToProps)(UserOrders)

export default UserOrdersContainer
