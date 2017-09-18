import React from 'react'
import {Modal, Table} from 'react-bootstrap'
import {connect} from 'react-redux'
import {removeModal, signup, googleLogin } from '../store'

export function CartModal(props) {
	// console.log('inside cartmodal', props.cart)
	// get cart from state
	// render products in cart
	// allow products to be deleted or their quantity updated
	// replace cart state when quantity or products are changed
	const cartProducts = Object.keys(props.cart).map((id) => props.cart[id])
	return (
		<Modal bsSize="large" show = {true} onHide = {() => {
			props.handleRemoveModal()}} >
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
												<img src={product.imageUrl} alt={`${product.name} image`} height="99" width="99" />
											</div>
                                        </td>
										<td>{product.price}</td>
										<td>{product.quantity}</td>
									</tr>
								)
							})
						}
					</tbody>
				</Table>
			</Modal.Body>
		</Modal>

	)
}

const mapStateToProps =({cart}) => ({cart})

const mapDispatchToProps = (dispatch) => {
	return {
		handleRemoveModal() {
			dispatch(removeModal())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CartModal)