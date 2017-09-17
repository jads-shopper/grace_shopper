import React from 'react'
import {Link} from 'react-router-dom'
import {FormGroup, Row, Button, Checkbox, ControlLabel,  FormControl} from 'react-bootstrap'
import _ from 'lodash'

export default function UserAddProductForm(props) {
	const {currentProduct, categories} = props
	const productId = currentProduct.id

	const filterRelatedProducts = () => {
		const currentProductCategories = currentProduct.categories.map((category => category.id))
		const relatedCategories = categories.filter((category) => currentProductCategories.includes(category.id))
		const oneOfEachRelatedCategory = relatedCategories.map((relatedCategory) => relatedCategory.products[0])
		const uniqueRelatedProducts = _.uniqBy(oneOfEachRelatedCategory, 'id')
		return uniqueRelatedProducts.filter((uniqueRelatedProducts => uniqueRelatedProducts.id !== productId))
	}

	const renderRelatedProducts = () => {
		return (
			filterRelatedProducts().map((relatedProduct) => {
				return (
					<Checkbox key={relatedProduct.id}>
						<Link to={`/products/${relatedProduct.id}`}>{relatedProduct.name} - <p style={{color: 'green', display: 'inline-block'}}>${relatedProduct.price}</p></Link>
					</Checkbox>
				// {' '}
				)
			})
		)
	}
	const filteredProducts = filterRelatedProducts()

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
										filteredProducts.length > 0 && renderRelatedProducts()
									}
								</FormGroup>
								<FormGroup controlId="formControlsSelect">
									<ControlLabel>Select</ControlLabel>
									<FormControl componentClass="select" placeholder="select">
										{
											[...Array(31)]
												.map((x, index) => index)
												.filter((index) => index !== 0)
												.map((quantity) => <option key={quantity} value={quantity}>{quantity}</option>)
										}
									</FormControl>
								</FormGroup>
								<Button
									onClick={() => props.handleAddToCart(currentProduct)}
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