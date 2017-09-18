import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Row, Col, Table, Button} from 'react-bootstrap'
import {fetchUsers, fetchOrders} from './../store'
import history from './../history'

const mapStateToProps = function(state) {
	return {
		products: state.products,
		categories: state.categories,
		users: state.users,
		orders: state.orders
	}
}

const mapDispatch = (dispatch) => {
	return {
		loadInitialData () {
			dispatch(fetchUsers())
			dispatch(fetchOrders())
		}
	}
}

class AdminView extends Component {
	componentDidMount () {
		this.props.loadInitialData()
	}

	render() {
		if(this.props.users && this.props.orders){
			return (
				<Row>
					<Col xs={12} sm={4}>
						<h2>Users</h2>
						<Button onClick={() => {history.push('/admin/newUser')}}>Add User</Button>
						<Table striped bordered condensed hover>
							<thead>
								<tr>
									<th>#</th>
									<th>Name</th>
									<th>Email</th>
								</tr>
							</thead>
							<tbody>
								{
									this.props.users.map(user => {
										return (
											<tr key={user.id} onClick={() => {history.push(`/admin/edit/user/${user.id}`)}}>
												<td>{user.id}</td>
												<td>{user.firstName + ' ' + user.lastName}</td>
												<td>{user.email}</td>
											</tr>
										)
									})
								}
							</tbody>
						</Table>
					</Col>
					<Col xs={12} sm={4}>
						<h2>Products</h2>
						<Button onClick={() => {history.push('/admin/newProduct')}}>Add Product</Button>
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
									this.props.products.map(product => {
										return (
											<tr key={product.id} onClick={() => {history.push(`/admin/edit/product/${product.id}`)}}>
												<td>{product.id}</td>
												<td>{product.name}</td>
												<td>${product.price}</td>
												<td>{product.quantity}</td>
												<td>{product.isActive ? 'Yes' : 'No'}</td>
											</tr>
										)
									})
								}
							</tbody>
						</Table>
					</Col>
					<Col xs={12} sm={4}>
						<h2>Categories</h2>
						<Button onClick={() => {history.push('/admin/newCategory')}}>Add Category</Button>
						<Table striped bordered condensed hover>
							<thead>
								<tr>
									<th>#</th>
									<th>Name</th>
									<th>Products</th>
								</tr>
							</thead>
							<tbody>
								{
									this.props.categories.map(category => {
										return (
											<tr key={category.id} onClick={() => {history.push(`/admin/edit/category/${category.id}`)}}>
												<td>{category.id}</td>
												<td>{category.name}</td>
												<td>{category.products ? category.products.length : 0}</td>
											</tr>
										)
									})
								}
							</tbody>
						</Table>
						<h2>Orders</h2>
						<Button onClick={() => {history.push('/admin/newOrder')}}>Add Order</Button>
						<Table striped bordered condensed hover>
							<thead>
								<tr>
									<th>#</th>
									<th>Shipping Address</th>
									<th>Fulfilled</th>
								</tr>
							</thead>
							<tbody>
								{
									this.props.orders.map(order => {
										return (
											<tr key={order.id} onClick={() => {history.push(`/admin/edit/order/${order.id}`)}}>
												<td>{order.id}</td>
												<td>{order.shippingAddress}</td>
												<td>{order.fulfilled ? 'Yes' : 'No'}</td>
											</tr>
										)
									})
								}
							</tbody>
						</Table>
					</Col>
				</Row>
			)
		} else {
			return(<div>Loading...</div>)
		}
	}
}

const AdminContainer = connect(mapStateToProps, mapDispatch)(AdminView)

export default AdminContainer