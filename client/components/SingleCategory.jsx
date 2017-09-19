import React from 'react'
import { NavLink } from 'react-router-dom'
import {connect} from 'react-redux'
import {Col, Row, Button} from 'react-bootstrap'
import Categories from './Categories.jsx'
import SingleProductRating from './SingleProductRating.jsx'
import {addToCart} from "../store/cart";

const mapStateToProps = function(state) {
	return {
		products: state.products,
		categories: state.categories,
		search: state.searchProduct,
	}
}

const mapDispatchToProps = function (dispatch) {
	return {
		handleAddToCart: (product, quantity) => {
			return dispatch(addToCart(product, quantity))
		}
	}
}

function SingleCategoryList(props){
	const categoryId = Number(props.match.params.id)
	const theCategory = props.categories.filter(category => {
		return category.id === categoryId
	})[0]
	let prods = props.products.filter(prod => prod.name.includes(props.search.query))
	if(prods && theCategory){
		return (
			<Row>
				<Categories />
				<Col xs={12} sm={9}>
					<h2>{theCategory.name}</h2>
					<ul className="list-unstyled">
						{ 
							prods.map(product => {
								let hasCatagory = product.categories.some(category => {
									return category.name === theCategory.name
								})
								if(hasCatagory){
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
													<img src={`${product.imageURL}`} alt={`${product.name} image`} height="99" width="99" />
												</div>
											</NavLink>
											<div className="productInfo">
												<NavLink to={`/products/${product.id}`}><div><h4>Product: {product.name}</h4></div></NavLink>
												<div><h4>${product.price}</h4></div>
												<div><h5>Category: {product.categories.length ? categoryNameArray.join(', ') : 'None'}</h5></div>
												<SingleProductRating currentProduct={product}/>
											</div>
											<Button bsStyle="info" className="catalogButton" onClick={() => props.handleAddToCart(product, 1)}>Add to Cart</Button>
										</li>
									)
								}
							})
						}
					</ul>
				</Col>
			</Row>
		)
	} else {
		return(
			<Row>
				<Categories />
				<h3>Category with id:{categoryId} does not exist.</h3>
			</Row>
		)
	}
}

const SingleCategoryContainer = connect(mapStateToProps, mapDispatchToProps)(SingleCategoryList)

export default SingleCategoryContainer