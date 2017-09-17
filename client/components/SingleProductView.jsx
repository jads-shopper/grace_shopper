import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Row, Col, Carousel, Button, FormGroup, Checkbox, Grid, ListGroup, ListGroupItem} from 'react-bootstrap'
import {AddProductForm} from './AddProductForm.jsx';
import {SingleProductReviews} from './SingleProductReviews.jsx'

// TODO: Refactor the customer reviews, star ratings, and related products code into their components

export function SingleProductView(props) {
	const productId = +props.match.params.id
	const {products, categories} = props
	const currentProduct = products.filter((product) => product.id === productId)[0]
	console.log('curr product', currentProduct)

	// Get average review rating
	const calcAverageRating = () => {
		return currentProduct.reviews
			.map((review) => review.rating)
			.reduce((acc, curr) => acc + curr) / currentProduct.reviews.length
	}
	// Convert the average review rating to a .5 interval rating so it can be represented by stars
	const calcStarRating = (rating) => {
		const floor = Math.floor(rating)
		const ceil = Math.ceil(rating)
		const midPoint = (floor + ceil) / 2
		const difference = rating - midPoint
		if (Math.abs(difference) <= 0.25) {
			return midPoint
		} else if(difference < 0.25) {
			return floor
		} else {
			return ceil
		}
	}
	// render the star rating
	const renderStarRating = (starRating) => {
		var starRatingArr = []
		if (starRating === Math.round(starRating)) {
			console.log('equal to rounded')
			for (var i = 0; i < starRating; i++) {
				starRatingArr.push('full')
			}
			var j = 0
			return starRatingArr.map(() => {
				return (
					<a key={j++} href="#"><i className="fa fa-star"></i></a>
				)
			})
		} else {
			console.log('starrating not equal to rounded', starRating, Math.round(starRating))
			for (var i = 0; i < starRating - 1; i++) {
				console.log(i)
				starRatingArr.push('full')
			}
			starRatingArr.push('half')

			return starRatingArr.map((type) => {
            	if (type === 'full') {
					return (
						<a key={j++} href="#"><i className="fa fa-star"></i></a>
					)
				} else {
					return (
						<a key={j++} href="#"><i className="fa fa-star-half-o"></i></a>
					)
				}
			})
		}
	}

	const starRating = calcStarRating(calcAverageRating())

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
							{
								renderStarRating(starRating)
							}
							<br />
							<a href="#">{currentProduct.reviews.length} customer reviews</a>
							<hr />
						List Price: <p style={{color: 'green', display: 'inline-block'}}>${currentProduct.price}</p>
							<p>Description:</p>
							<p>{currentProduct.description}</p>
						</div>
					</Col>
					<Col md={3}>
						<AddProductForm currentProduct={currentProduct} categories={categories} />
						{/*<Row>*/}
							{/*<div className="card border-dark mb-3" style={{maxWidth: '20rem'}}>*/}
								{/*<div className="card-body text-dark">*/}
									{/*{renderRelatedProducts(filterRelatedProducts())}*/}
								{/*</div>*/}
							{/*</div>*/}
						{/*</Row>*/}
						{/*<Row>*/}
							{/*<Button bsStyle="info"><i className="fa fa-cart-plus" aria-hidden="true"></i> Add to cart</Button>*/}
						{/*</Row>*/}
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

const mapStateToProps = ({products, categories}) => ({products, categories})

export default connect(mapStateToProps, null)(SingleProductView)



