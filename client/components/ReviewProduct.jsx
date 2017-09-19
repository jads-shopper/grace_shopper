import React from 'react'
import {connect} from 'react-redux'
import {Row, Col, Carousel, Grid, Button} from 'react-bootstrap'
import {writeTitle, writeText, setRating, postReview} from './../store'
import SingleProductRating from './SingleProductRating.jsx'

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
							{/*<p>Quantity Remaining: {currentProduct.quantity}</p>*/}
							<p>{currentProduct.description}</p>
						</div>
					</Col>
					<Col md={3}>
					</Col>
				</Row>
				<hr />
				<form id="newReviewForm" onSubmit={(evt) => {props.handleSubmit(evt, props.user.id)}}>
					<Row>
						<Col xs={4} sm={3}>
							<span>
								<h5>Title</h5>
							</span>
							<input
								autoComplete= "off"
								type="text"
								name="title"
								onChange={props.handleTitle}
							/>
						</Col>
						<Col xs={4} sm={4}>
							<span>
								<h5>Rating</h5>
							</span>
							<select name="rating" onChange={props.handleRating}>
								<option value={1}>1</option>
								<option value={2}>2</option>
								<option value={3}>3</option>
								<option value={4}>4</option>
								<option value={5}>5</option>
							</select>
						</Col>
						<Col xs={4} sm={3}>
							<Button bsStyle="info" type="submit" className="submitButton">Submit Review</Button>
						</Col>
						<Col xs={0} sm={1}>
						</Col>
					</Row>
					<Row>
						<Col xs={10}>
							<span>
								<h5>Text</h5>
							</span>
							<input
								autoComplete= "off"
								type="text"
								name="text"
								onChange={props.handleText}
							/>
						</Col>
					</Row>
				</form>
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
const mapStateToProps = ({products, categories, cart, user}) => ({products, categories, cart, user})
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		handleTitle: function(evt){
			dispatch(writeTitle(evt.target.value))
		},
		handleText: function(evt){
			dispatch(writeText(evt.target.value))
		},
		handleRating: function(evt){
			dispatch(setRating(evt.target.value))
		},
		handleSubmit: (evt, id) => {
			console.log(evt.target)
			evt.preventDefault()
			dispatch(postReview({title: evt.target.title.value, text: evt.target.text.value, rating: evt.target.rating.value, productId: Number(ownProps.match.params.id), userId: id}))
			dispatch(writeTitle(''))
			dispatch(writeText(''))
			dispatch(setRating(1))
			ownProps.history.push('/orders')
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProductView)
