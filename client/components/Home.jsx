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
				<ul className="list-unstyled col-sm-6 col-xs-11">
					{ props.products.map(product => {
						return (
							<li className="" key={product.id}>
								<NavLink to={`/products/${product.id}`}>
									<div className="">
										<img src={`${product.imageURL}`} alt={`${product.name} image`} height="60" width="60" />
									</div>
								</NavLink>
								<div className="">
									<div><NavLink to={`/products/${product.id}`}>{product.name} Product</NavLink></div>
									<div className="badge">Amount Remaining: {product.quantity}</div>
								</div>
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