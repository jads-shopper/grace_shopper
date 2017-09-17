import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {FormGroup, Row, Button, Checkbox, ControlLabel,  FormControl} from 'react-bootstrap'
import _ from 'lodash'

export default class UserAddProductForm extends Component {

	constructor(props) {
		super(props)

		this.currentProduct = this.props.currentProduct
		this.productId = this.currentProduct.id
		this.categories = this.props.categories

		this.filterRelatedProducts = this.filterRelatedProducts.bind(this)
		this.renderRelatedProducts = this.renderRelatedProducts.bind(this)
	}

	filterRelatedProducts() {
		const currentProductCategories = this.currentProduct.categories.map((category => category.id))
		const relatedCategories = this.categories.filter((category) => currentProductCategories.includes(category.id))
		const oneOfEachRelatedCategory = relatedCategories.map((relatedCategory) => relatedCategory.products[0])
		const uniqueRelatedProducts = _.uniqBy(oneOfEachRelatedCategory, 'id')
		return uniqueRelatedProducts.filter((uniqueRelatedProducts => uniqueRelatedProducts.id !== this.productId))
	}

	renderRelatedProducts() {
		return (
			this.filterRelatedProducts().map((relatedProduct) => {
				return (
					<Checkbox key={relatedProduct.id}>
						<Link to={`/products/${relatedProduct.id}`}>{relatedProduct.name} - <p style={{color: 'green', display: 'inline-block'}}>${relatedProduct.price}</p></Link>
					</Checkbox>
				// {' '}
				)
			})
		)
	}

	render() {
		const filteredProducts = this.filterRelatedProducts()
		console.log('filtered', filteredProducts)

		return (
			<div>
				<Row>
					<div className="card border-dark mb-3" style={{maxWidth: '20rem'}}>
						<div className="card-body text-dark">
							{/*{renderRelatedProducts(filterRelatedProducts())}*/}
							<div>
								{filteredProducts.length > 0 && <h4 className="card-title">Add a :</h4>}
								<form>
									<FormGroup>
										{
											filteredProducts.length > 0 && this.renderRelatedProducts()
										}
									</FormGroup>
									<FormGroup controlId="formControlsSelect">
										<ControlLabel>Select</ControlLabel>
										<FormControl componentClass="select" placeholder="select">
											{/*
											TODO: Quantity should max out at the number of remaining items and prevent adding to cart if exceeds remaining
											TODO: Quantity should be reduced when adding to cart
											*/}
											{
												[...Array(this.currentProduct.quantity + 1)]
													.map((x, index) => index)
													.filter((index) => index !== 0)
													.map((quantity) => <option key={quantity} value={quantity}>{quantity}</option>)
											}
										</FormControl>
									</FormGroup>
									<Button
										onClick={() => this.props.handleAddToCart(this.currentProduct, 1)}
										bsStyle="info">
										<i className="fa fa-cart-plus" aria-hidden="true"></i>  Add to cart
									</Button>
								</form>
							</div>
						</div>
					</div>
				</Row>
			</div>
		)

	}
}
