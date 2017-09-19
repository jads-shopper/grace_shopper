import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Col, Row, Table, Button} from 'react-bootstrap'
import {fetchOrderProducts, fetchOrders, editOrder} from './../store'

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
		const theOrder = this.props.orders.filter(order => {
			return order.id === orderId
		})[0]

		if(theOrder && theOrder.products) {
			return (
				<div>
					<Row>
						<Col xs={0} sm={1}>
						</Col>
						<Col xs={12} sm={11}>
							<h3>Order #{orderId}</h3>
							<span>
								<h4>Shipping Address: {theOrder.shippingAddress}</h4>
							</span>
							<span>
								<h5>User ID: {theOrder.userId}</h5>
							</span>
							<span>
								<h5>Status: {theOrder.fulfilled ? 'Fulfilled' : 'Unfulfilled'}</h5>
							</span>
							<Button onClick={(evt) => {this.props.handleToggle(evt, theOrder)}}>Toggle Status</Button>
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
										<th>#</th>
										<th>Name</th>
										<th>Price</th>
										<th>Quantity</th>
										<th>Active</th>
									</tr>
								</thead>
								<tbody>
									{
										theOrder.products.map(product => {
											let theOrderProduct =  this.props.orderProduct.filter(one => {
												return Number(one.productId) === Number(product.id)
											})[0]
											if(theOrderProduct){
												return (
													<tr key={product.id} onClick={() => {history.push(`/admin/edit/product/${product.id}`)}}>
														<td>{product.id}</td>
														<td>{product.name}</td>
														<td>${product.price}</td>
														<td>{theOrderProduct.quantity}</td>
														<td>{product.isActive ? 'Yes' : 'No'}</td>
													</tr>
												)
											} else {
												return (<tr key='first'><td key='second'>Loading...</td></tr>)
											}
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
			dispatch(fetchOrderProducts(id))
			dispatch(fetchOrders())
		},
		handleToggle(evt, theOrder) {
			evt.preventDefault()
			dispatch(editOrder({id: Number(theOrder.id), fulfilled: !theOrder.fulfilled}))
		}
	}
}


const EditOrderContainer = connect(mapStateToProps, mapDispatch)(EditOrderForm)

export default EditOrderContainer
