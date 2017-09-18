import React, {Component} from 'react'
import {Modal, Table, Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {removeModal, updateCart, removeFromCart } from '../store'

export class CartModal extends Component {
	constructor(props) {
		super(props)

		this.handleSelectChange = this.handleSelectChange.bind(this)
	}

	handleSelectChange(e, productId) {
	    console.log('inside selectchange', +e.target.value, productId)
		this.props.updateCart(+e.target.value, +productId)
	}

	// console.log('inside cartmodal', props.cart)
	// get cart from state
	// render products in cart
	// allow products to be deleted or their quantity updated
	// replace cart state when quantity or products are changed
	render() {
		this.cartProducts = Object.keys(this.props.cart).map((id) => {
		    return {id: id, ...this.props.cart[id]}
		})
		console.log('inside cartmodal', this.cartProducts)
		if(this.cartProducts.length > 0) {
			return (
				<Modal bsSize="large" show={true} onHide={() => {
					this.props.handleRemoveModal()
				}}>
					<Modal.Header closeButton>
						<Modal.Title>My Cart</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Table responsive>
							<thead>
								<tr>
									<th></th>
									<th>Price</th>
									<th>Quantity</th>
									<th></th>
									<th></th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{
									this.cartProducts.map((product) => {
										return (
											<tr key={product.id}>
												<td>
													<h3>{product.name}</h3>
													<div className="productImage">
														<img src={product.imageUrl} alt={`${product.name} image`} height="99"
															width="99"/>
													</div>
												</td>
												<td>{product.price}</td>
												<td>
													{/*{product.quantity}*/}
													<select className="form-control" placeholder="select" onChange={(e) => this.handleSelectChange(e, product.id)} value={product.quantity}>
														{/*
											TODO: Quantity should max out at the number of remaining items and prevent adding to cart if exceeds remaining
											TODO: Quantity should be reduced when adding to cart
											*/}
														{
															[...Array(product.quantity + 1)]
																.map((x, index) => index)
																.filter((index) => index !== 0)
																.map((quantity) => <option key={quantity} value={quantity}>{quantity}</option>)
														}
													</select>
												</td>
												<td><Button onClick={() => this.props.removeProductFromCart(product.id)} bsStyle="danger">Remove</Button></td>
											</tr>
										)
									})
								}
							</tbody>
						</Table>
                        Subtotal: {
						    this.cartProducts
								.map((product) => product.price * product.quantity)
								.reduce((acc, curr) => acc + curr, 0)
						}
					</Modal.Body>
				</Modal>
			)
		} else {
		    return (
		        <div>Cart is empty</div>
			)
		}

	}
}

const mapStateToProps =({cart}) => ({cart})

const mapDispatchToProps = (dispatch) => {
	return {
		handleRemoveModal() {
			dispatch(removeModal())
		},
		updateCart(quantity, productId) {
		    dispatch(updateCart({id: productId}, quantity))
		},
		removeProductFromCart(productId) {
		    dispatch(removeFromCart({id: productId}))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CartModal)