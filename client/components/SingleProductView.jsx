import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Row, Col, Carousel, Button, FormGroup, Checkbox, Grid, ListGroup, ListGroupItem} from 'react-bootstrap'

export function SingleProductView(props) {
	const productId = +props.match.params.id
	const currentProduct = props.products.filter((product) => product.id === productId)[0]
	console.log(currentProduct)
	const products = props.products
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
							<a href="#"><i className="fa fa-star"></i></a>
							<a href="#"><i className="fa fa-star"></i></a>
							<a href="#"><i className="fa fa-star"></i></a>
							<a href="#"><i className="fa fa-star"></i></a>
							<a href="#"><i className="fa fa-star-half-o"></i></a>
							{/* mock reviews length*/}
							{/*Add product has many reviews relationship*/}
							<br />
							<a href="#">534 customer reviews</a>
							<hr />
						List Price: <p style={{color: 'green', display: 'inline-block'}}>${currentProduct.price}</p>
							<p>Description:</p>
							<p>{currentProduct.description}</p>
						</div>
					</Col>
					<Col md={3}>
						<Row>
							<div className="card border-dark mb-3" style={{['max-width']: '20rem'}}>
								<div className="card-body text-dark">
									<h4 className="card-title">Add a :</h4>
									<FormGroup>
										<form>
											<Checkbox>
												<Link to={`/products/${products[0].id}`}>{products[0].name} - <p style={{color: 'green', display: 'inline-block'}}>${products[0].price}</p></Link>
											</Checkbox>
											{' '}
											<Checkbox>
												<Link to={`/products/${products[4].id}`}>{products[4].name} - <p style={{color: 'green', display: 'inline-block'}}>${products[4].price}</p></Link>
											</Checkbox>
											{' '}
											<Checkbox>
												<Link to={`/products/${products[2].id}`}>{products[2].name}  - <p style={{color: 'green', display: 'inline-block'}}>${products[2].price}</p></Link>
											</Checkbox>
										</form>
									</FormGroup>
								</div>
							</div>
						</Row>
						<Row>
							<Button bsStyle="info"><i className="fa fa-cart-plus" aria-hidden="true"></i> Add to cart</Button>
						</Row>
					</Col>
				</Row>
				<hr />
				<Row>
					<h3>Customer Reviews</h3>
					{/*TODO: Add a title to the review model and ensure that all reviews have a user */}
					<ListGroup>
						{currentProduct.reviews.map((review) => {
							return (
								<ListGroupItem key={review.id}>
									<p>{review.rating} {review.title}</p>
									<p>by {review.userId} on {review.createdAt}</p>
									<br />
									<p>{review.text}</p>
								</ListGroupItem>
							)
						})}
					</ListGroup>
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

const mapStateToProps = ({products}) => ({products})

export default connect(mapStateToProps, null)(SingleProductView)



