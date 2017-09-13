import React from 'react'
import { NavLink } from 'react-router-dom'
import {connect} from 'react-redux'
import {Col} from 'react-bootstrap'

const mapStateToProps = function(state) {
	return {
		products: state.products
	}
}

function ProductList(props){
	if(props.products){
		return (
			<Col xs={12} sm={9}>
				<ul className="list-unstyled">
					{ props.products.map(product => {
						return (
							<li className="productItem" key={product.id}>
								<NavLink to={`/products/${product.id}`}>
									<div className="productImage">
										<img src={`${product.imageURL}`} alt={`${product.name} image`} height="60" width="60" />
									</div>
									<div className="productInfo">
										<div><h5>Product: {product.name}</h5></div>
										<div><h5>Category: {product.category}</h5></div>
										<div><h5>Amount Remaining: {product.quantity}</h5></div>
									</div>
								</NavLink>
							</li>
						)
					})
					}
				</ul>
			</Col>
		)
	} else {
		return(<div>Error</div>)
	}
}

const ProductContainer = connect(mapStateToProps)(ProductList)

export default ProductContainer