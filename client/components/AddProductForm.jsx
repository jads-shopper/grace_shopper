import React from 'react'
import {Link} from 'react-router-dom'
import {FormGroup, Row, Button, Checkbox} from 'react-bootstrap'
import _ from 'lodash'


export function AddProductForm(props) {
	const {currentProduct, categories} = props
	const productId = currentProduct.id
	const filterRelatedProducts = () => {
		const currentProductCategories = currentProduct.categories.map((category => category.id))
		const relatedCategories = categories.filter((category) => currentProductCategories.includes(category.id))
		const oneOfEachRelatedCategory = relatedCategories.map((relatedCategory) => relatedCategory.products[0])
		const uniqueRelatedProducts = _.uniqBy(oneOfEachRelatedCategory, 'id')
		return uniqueRelatedProducts.filter((uniqueRelatedProducts => uniqueRelatedProducts.id !== productId))
	}

	const renderRelatedProducts = (relatedProducts) => {
		if(relatedProducts.length) {
			return (
				<div>
					<h4 className="card-title">Add a :</h4>
					<FormGroup>
						<form>
							{
								filterRelatedProducts().map((relatedProduct) => {
									return (
										<Checkbox key={relatedProduct.id}>
											<Link to={`/products/${relatedProduct.id}`}>{relatedProduct.name} - <p style={{color: 'green', display: 'inline-block'}}>${relatedProduct.price}</p></Link>
										</Checkbox>
									// {' '}
									)
								})
							}
							<Button bsStyle="info"><i className="fa fa-cart-plus" aria-hidden="true"></i> Add to cart</Button>
						</form>
					</FormGroup>
				</div>
			)
		}
	}

	return (
		<div>
			<Row>
				<div className="card border-dark mb-3" style={{maxWidth: '20rem'}}>
					<div className="card-body text-dark">
						{renderRelatedProducts(filterRelatedProducts())}
					</div>
				</div>
			</Row>
		</div>
	)
}