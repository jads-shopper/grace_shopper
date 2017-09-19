import React, {Component} from 'react'
import {Modal, Table, Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {removeModal, updateCart, removeFromCart } from '../store'
import axios from 'axios'

// TODO: Work on CSS
// TODO: Add a checkout button page that routes to checkout page
// TODO: Refactor class to function
export class CartModal extends Component {
	constructor(props) {
		super(props)

		this.handleSelectChange = this.handleSelectChange.bind(this)
        this.callNumOfOptions = this.callNumOfOptions.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		axios.post('/api/cart', nextProps.cart)
			.catch(console.error)
	}

	handleSelectChange(e, productId) {
	    console.log('inside selectchange', +e.target.value, productId)
		this.props.updateCart(+e.target.value, +productId)
	}

	callNumOfOptions(quantityOfCartProduct, quantityOfInventoryProduct) {
	    console.log('inside callnumofoptions', quantityOfCartProduct, quantityOfInventoryProduct)
	    if (quantityOfCartProduct  > quantityOfInventoryProduct) {
	        return quantityOfCartProduct + 1
        } else {
	        return quantityOfInventoryProduct + 1
        }
    }

	// console.log('inside cartmodal', props.cart)
	// get cart from state
	// render products in cart
	// allow products to be deleted or their quantity updated
	// replace cart state when quantity or products are changed
	render() {
	    const cart = this.props.cart
        const products = this.props.products
		const cartProducts = Object.keys(cart).map((id) => {
		    return {id: id, ...cart[id]}
		})
		console.log('inside cartmodal', cartProducts)
		if(cartProducts.length > 0) {
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
									cartProducts.map((product) => {
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
											TODO: Small bug when reducing quantity of product through selection. # of options also decrease
											*/}
														{
														    // console.log(cartProducts, products)
															[...Array(this.callNumOfOptions(product.quantity, products[product.id].quantity))]
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
						    cartProducts
								.map((product) => product.price * product.quantity)
								.reduce((acc, curr) => acc + curr, 0).toFixed(2)
						}
                        <Link to="/checkout"><Button>Checkout</Button></Link>
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

const mapStateToProps =({cart, products}) => ({cart, products})

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
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CartModal)