import React from 'react'
import {connect} from 'react-redux'
import {Row, Col, Carousel, Grid} from 'react-bootstrap'
import UserAddProductForm from './UserAddProductForm.jsx'
import SingleProductReviews from './SingleProductReviews.jsx'
import SingleProductRating from './SingleProductRating.jsx'
import {addToCart, removeFromCart} from '../store/cart'

// TODO: Refactor the customer reviews, star ratings, and related products code into their components

export function SingleProductView(props) {
	const productId = +props.match.params.id
	const {products, categories} = props
	const currentProduct = products.filter((product) => product.id === productId)[0]

	if(currentProduct) {
		return (
			<Grid>
				<Row>
					<Col md={3}>
						<Carousel>
							{
								[1,2,3].map((index) => {
									return (
										<Carousel.Item key={index}>
											{/*
											TODO: Change image dimensions to reflect actual dimensions
											TODO: Determine whether or not to have multiple images for a product
											*/}
											<img width={900} height={500} alt="900x500" src={currentProduct.imageUrl}/>
										</Carousel.Item>
									)
								})
							}
						</Carousel>
					</Col>
					<Col md={6}>
						<div>
							<h2>{currentProduct.name}</h2>
								<SingleProductRating currentProduct={currentProduct}/>
							<hr />
						List Price: <p style={{color: 'green', display: 'inline-block'}}>${currentProduct.price}</p>
							<p>Quantity Remaining: {currentProduct.quantity}</p>
							<p>{currentProduct.description}</p>
						</div>
					</Col>
					<Col md={3}>
						<UserAddProductForm
							currentProduct={currentProduct}
							categories={categories}
							handleAddToCart={props.handleAddToCart}
						/>
					</Col>
				</Row>
				<hr />
				<Row>
					<SingleProductReviews reviews={currentProduct.reviews} />
				</Row>
			</Grid>
		)
	} else {
		return(
			<Row>
				<Col xs={0} sm={1}>
				</Col>
				<Col xs={12} sm={11}>
					<h3>The product with id:{productId} does not exist.</h3>
				</Col>
			</Row>
		)
	}
}

const mapStateToProps = ({products, categories, cart}) => ({products, categories, cart})
const mapDispatchToProps = (dispatch) => {
	return {
		handleAddToCart: (product, quantity) => {
			return dispatch(addToCart(product, quantity))
		},
		handleRemoveFromCart: (product) => {
			return dispatch(removeFromCart(product))
		},
		handleSubmit: () => {
			// add checked products + current product to cart
		},
		handleSelectQuantity: () => {

		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProductView)



