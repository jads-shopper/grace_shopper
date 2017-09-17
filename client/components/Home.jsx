import React from 'react'
import { NavLink } from 'react-router-dom'
import {connect} from 'react-redux'
import {Col, Row, Button} from 'react-bootstrap'
import Categories from './Categories.jsx'
import SingleProductRatings from './SingleProductRating.jsx'

const mapStateToProps = function(state) {
	return {
		products: state.products
	}
}

function ProductList(props){

	if(props.products){
		return (
			<Row>
				<Categories />
				<Col xs={12} sm={9}>
					<ul className="list-unstyled">
						{ props.products.map(product => {
							let categoryArray, categoryNameArray
							if (product.categories){
								categoryArray = product.categories
								categoryNameArray = categoryArray.map(category => {
									return category.name
								})
							}
							return (
								<li className="productItem" key={product.id}>
									<NavLink to={`/products/${product.id}`}>
										<div className="productImage">
											<img src={`${product.imageUrl}`} alt={`${product.name} image`} height="120" width="120" />
										</div>
									</NavLink>
									<div className="productInfo">
										<NavLink to={`/products/${product.id}`}><div><h4>Product: {product.name}</h4></div></NavLink>
										<div><h4>${product.price}</h4></div>
										<div><h5>Category: {product.categories && product.categories[0] ? categoryNameArray.join(', ') : 'None'}</h5></div>
										{/*<div><h5>Quantity Left: {product.quantity}</h5></div>*/}
										<SingleProductRatings currentProduct={product}/>
									</div>
									<Button bsStyle="success" className="catalogButton" onClick={() => {alert('Feature not yet implemented!')}}>Add to Cart</Button>
								</li>
							)
						})
						}
					</ul>
				</Col>
			</Row>
		)
	} else {
		return(<div>Error</div>)
	}
}

const ProductContainer = connect(mapStateToProps)(ProductList)

export default ProductContainer
