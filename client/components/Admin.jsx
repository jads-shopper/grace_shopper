import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'
import {connect} from 'react-redux'
import {Row, Col, Table} from 'react-bootstrap'
import store, {fetchUsers} from './../store'

const mapStateToProps = function(state) {
	return {
		products: state.products,
		categories: state.categories,
		users: state.users
	}
}

const mapDispatch = (dispatch) => {
	return {
		loadInitialData () {
			dispatch(fetchUsers())
		}
	}
}

class AdminView extends Component {
	componentDidMount () {
		this.props.loadInitialData()
	}

	render() {
		if(this.props.users){
			return (
				<Row>
					<Col xs={12} sm={4}>
						<h2>Users</h2>
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
											<tr key={user.id}>
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
											<tr key={product.id}>
												<td>{product.id}</td>
												<td>{product.name}</td>
												<td>{product.price}</td>
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
											<tr key={category.id}>
												<td>{category.id}</td>
												<td>{category.name}</td>
												<td>{category.products.length}</td>
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
			return(<div>Error</div>)
		}
	}
}

const AdminContainer = connect(mapStateToProps, mapDispatch)(AdminView)

export default AdminContainer