import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Col, Row, Table, Button} from 'react-bootstrap'
import {fetchSingleOrder, editOrder} from './../store'

const mapStateToProps = function(state) {
	return {
		orders: state.orders,
		orderProduct: state.orderProduct,
	}
}

class EditOrderForm extends Component {
	componentDidMount () {
		this.props.loadInitialData(Number(this.props.match.params.id))
	}

	render(){
		const orderId = Number(this.props.match.params.id)
		const theOrder = this.props.orders[0]

		if(theOrder && theOrder.products) {
			//Calculating the total of an order
			let orderTotal = 0
			theOrder.products.forEach(product => {
				let quantityCost = product.price * product.orderProduct.quantity
				orderTotal += quantityCost
			})
			return (
				<div>
					<Row>
						<Col xs={0} sm={1}>
						</Col>
						<Col xs={12} sm={10}>
							<h3>Order #{orderId}</h3>
							<h4>Shipping Address: {theOrder.shippingAddress}</h4>
							<h5>User: {theOrder.user.firstName} {theOrder.user.lastName}({theOrder.userId})</h5>
							<h5>Total: ${orderTotal}</h5>
							<h5>Status: {theOrder.fulfilled ? 'Fulfilled' : 'Unfulfilled'}</h5>
							<Button onClick={(evt) => {this.props.handleToggle(evt, theOrder)}}>Toggle Status</Button>
						</Col>
						<Col xs={0} sm={1}>
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
										theOrder.products.map(product => {
											return (
												<tr key={product.id}>
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
						<Col xs={0} sm={1}>
						</Col>
					</Row>
				</div>
			)
		} else {
			return(
				<Row>
					<Col xs={0} sm={1}>
					</Col>
					<Col xs={12} sm={11}>
						<h3>The order with id:{orderId} does not exist.</h3>
					</Col>
				</Row>
			)
		}
	}
}

const mapDispatch = (dispatch) => {
	return {
		loadInitialData (id) {
			dispatch(fetchSingleOrder(id))
		},
		handleToggle(evt, theOrder) {
			evt.preventDefault()
			dispatch(editOrder({id: Number(theOrder.id), fulfilled: !theOrder.fulfilled}))
		}
	}
}


const EditOrderContainer = connect(mapStateToProps, mapDispatch)(EditOrderForm)

export default EditOrderContainer
