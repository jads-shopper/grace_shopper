import React from 'react'
import {connect} from 'react-redux'
import {Col, Row, Button} from 'react-bootstrap'
import {editProduct, deleteProduct, writeProductName, writeImageURL, writePrice, writeDescription, writeQuantity, activeSelect} from './../store'

const mapStateToProps = function(state) {
	return {
		products: state.products,
		newProduct: state.newProduct,
		categories: state.categories
	}
}

function EditProductForm(props){
	const productId = Number(props.match.params.id)
	const theProduct = props.products.filter(product => {
		return product.id === productId
	})[0]

	if(theProduct) {
		return (
			<div>
				<Row>
					<Col xs={0} sm={1}>
					</Col>
					<Col xs={12} sm={11}>
						<form id="newProductForm" onSubmit={(evt) => {props.handleSubmit(evt, props.categories)}}>
							<div className="">
								<span>
									<h5>Name</h5>
								</span>
								<input
									className=""
									autoComplete= "off"
									type="text"
									name="name"
									defaultValue={theProduct.name}
									onChange={props.handleName}
								/>
							</div>
							<div className="">
								<span>
									<h5>Image URL</h5>
								</span>
								<input
									className=""
									autoComplete= "off"
									type="text"
									name="imageURL"
									defaultValue={theProduct.imageURL}
									onChange={props.handleImageURL}
								/>
							</div>
							<div className="">
								<span>
									<h5>Price</h5>
								</span>
								$<input
									className=""
									autoComplete= "off"
									type="text"
									name="price"
									defaultValue={theProduct.price}
									onChange={props.handlePrice}
								/>
							</div>
							<div className="">
								<span>
									<h5>Description</h5>
								</span>
								<input
									className=""
									autoComplete= "off"
									type="text"
									name="description"
									defaultValue={theProduct.description}
									onChange={props.handleDescription}
								/>
							</div>
							<div className="">
								<span>
									<h5>Quantity</h5>
								</span>
								<input
									className=""
									autoComplete= "off"
									type="text"
									name="quantity"
									defaultValue={theProduct.quantity}
									onChange={props.handleQuantity}
								/>
							</div>
							<div className="inputGroup">
								<span>
									<h5>Active Status</h5>
								</span>
								<select name="isActive" className="inputTextBox" onChange={props.handleActive}>
									<option value={true}>True</option>
									<option value={false}>False</option>
								</select>
							</div>
							<Button bsStyle="info" type="submit" className="submitButton">Edit Product</Button>
							<Button bsStyle="danger" onClick={props.handleDelete} className="deleteButton">Delete Product</Button>
						</form>
					</Col>
				</Row>
				<Row>
					<Col xs={0} sm={1}>
					</Col>
					<Col id="categoryCol" xs={12} sm={11}>
						<h5>Catagories</h5>
						{
							props.categories.map(category => {
								return(
									<div key={category.id}>
										<input type="checkbox" id={`categoryBox` + category.id} /> - {category.name}
									</div>
								)
							})
						}
					</Col>
				</Row>
			</div>
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

function mapDispatchToProps (dispatch, ownProps){
	return {
		handleName: function(evt){
			dispatch(writeProductName(evt.target.value))
		},
		handleImageURL: function(evt){
			dispatch(writeImageURL(evt.target.value))
		},
		handlePrice: function(evt){
			dispatch(writePrice(evt.target.value))
		},
		handleQuantity: function(evt){
			dispatch(writeQuantity(evt.target.value))
		},
		handleDescription: function(evt){
			dispatch(writeDescription(evt.target.value))
		},
		handleActive: function(evt){
			dispatch(activeSelect(evt.target.value))
		},
		handleSubmit: function(evt, categories){
			evt.preventDefault()
			let categoryArray = []
			categories.forEach(category => {
				let tempName = 'categoryBox' + category.id
				let targetSelect = document.getElementById(tempName)
				if (targetSelect.checked) {
					categoryArray.push(category.id)
				}
			})
			dispatch(editProduct({id: Number(ownProps.match.params.id), name: evt.target.name.value, imageURL: evt.target.imageURL.value, price: Number(evt.target.price.value), description: evt.target.description.value, quantity: Number(evt.target.quantity.value), isActive: evt.target.isActive.value}, categoryArray))
			dispatch(writeProductName(''))
			dispatch(writeImageURL(''))
			dispatch(activeSelect(false))
			dispatch(writePrice(0))
			dispatch(writeDescription(''))
			dispatch(writeQuantity(0))
			ownProps.history.push('/admin')
		},
		handleDelete: function(evt){
			evt.preventDefault()
			dispatch(deleteProduct({id: Number(ownProps.match.params.id)}))
			dispatch(writeProductName(''))
			dispatch(writeImageURL(''))
			dispatch(activeSelect(false))
			dispatch(writePrice(0))
			dispatch(writeDescription(''))
			dispatch(writeQuantity(0))
		}
	}
}

const EditProductContainer = connect(mapStateToProps, mapDispatchToProps)(EditProductForm)

export default EditProductContainer
