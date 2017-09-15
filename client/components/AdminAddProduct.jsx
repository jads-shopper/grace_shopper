import React from 'react'
import {connect} from 'react-redux'
import {Col, Row} from 'react-bootstrap'
import store, {postProduct, writeProductName, writeImageURL, writePrice, writeDescription, writeQuantity, activeSelect} from './../store'

const mapStateToProps = function(state) {
	return {
		newProduct: state.newProduct
	}
}

function AddProductForm(props){
	return (
		<Row>
			<Col xs={0} sm={1}>
			</Col>
			<Col xs={12} sm={11}>
				<form id="newProductForm" onSubmit={props.handleSubmit}>
					<div className="">
						<span>
							<h5>Name</h5>
						</span>
						<input
							className=""
							autoComplete= "off"
							type="text"
							name="name"
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
							defaultValue={0}
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
							defaultValue={0}
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
					<button type="submit" id="submit">Create User</button>
				</form>
			</Col>
		</Row>
	)
}

function mapDispatchToProps (dispatch){
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
		handleSubmit: function(evt){
			evt.preventDefault()
			dispatch(postProduct({name: evt.target.name.value, imageURL: evt.target.imageURL.value, price: Number(evt.target.price.value), description: evt.target.description.value, quantity: Number(evt.target.quantity.value), isActive: evt.target.isActive.value}))
			dispatch(writeProductName(''))
			dispatch(writeImageURL(''))
			dispatch(activeSelect(false))
			dispatch(writePrice(0))
			dispatch(writeDescription(''))
			dispatch(writeQuantity(0))
		}
	}
}

const AddProductContainer = connect(mapStateToProps, mapDispatchToProps)(AddProductForm)

export default AddProductContainer
