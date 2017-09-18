import React from 'react'
import {connect} from 'react-redux'
import {Col, Row, Button} from 'react-bootstrap'
import {postOrder, writeAddress, writeUserId, fulfilledSelect} from './../store'

const mapStateToProps = function(state) {
	return {
		newOrder: state.newOrder,
		products: state.products
	}
}
let selectorCounter = 1

function addProductSelector (products) {
		//creates selector element
		let newSelector = document.createElement('select')
		newSelector.className= 'productSelector'
		selectorCounter++
		newSelector.name = 'product' + selectorCounter
		newSelector.id = 'product' + selectorCounter
		let nullOption = document.createElement('option')
		nullOption.append('None')
		nullOption.key = 'null'
		nullOption.value = null
		newSelector.append(nullOption)

		//creates quantity selector
		let numberSelector = document.createElement('select')
		numberSelector.className= 'numberSelector'
		numberSelector.name = 'quantity' + selectorCounter
		numberSelector.id = 'quantity' + selectorCounter
		let zeroOption = document.createElement('option')
		zeroOption.append('0')
		zeroOption.key = 'null'
		zeroOption.value = null
		numberSelector.append(zeroOption)
		for(var i = 1; i <= 10; i++){
			let numberOption = document.createElement('option')
			numberOption.append(i)
			numberOption.key = i
			numberOption.value = i
			numberSelector.append(numberOption)
		}

		//maps products and adds them as options
		products.forEach(product => {
			let newOption = document.createElement('option')
			newOption.append(product.name)
			newOption.key = product.id
			newOption.value = product.id
			newSelector.append(newOption)
		})

		let targetCol = document.getElementById('productCol')
		targetCol.append(newSelector)
		targetCol.append(numberSelector)
	}
}

function AddOrderForm(props){
	return (
		<div>
			<Row>
				<Col xs={0} sm={1}>
				</Col>
				<Col xs={12} sm={11}>
					<form id="newOrderForm" onSubmit={props.handleSubmit}>
						<div className="">
							<span>
								<h5>Shipping Address</h5>
							</span>
							<input
								className=""
								autoComplete= "off"
								type="text"
								name="shippingAddress"
								onChange={props.handleAddress}
							/>
						</div>
						<div className="">
							<span>
								<h5>User ID</h5>
							</span>
							<input
								className=""
								autoComplete= "off"
								type="text"
								name="userId"
								onChange={props.handleUserId}
							/>
						</div>
						<div className="inputGroup">
							<span>
								<h5>Fulfilled</h5>
							</span>
							<select name="isFulFilled" className="inputTextBox" onChange={props.handleFulfilled}>
								<option value={true}>Yes</option>
								<option value={false}>No</option>
							</select>
						</div>
						<Button bsStyle="info" type="submit" className="submitButton">Create Order</Button>
					</form>
				</Col>
			</Row>
			<Row>
				<Col xs={0} sm={1}>
				</Col>
				<Col id="categoryCol" xs={12} sm={11}>
					<h5>Product</h5>
					<button id="newCat" onClick={() => {addProductSelector(props.products)}}>Add Another Product</button>
					<select id="product1" name="product1" className="categorySelector" onChange={props.handleProduct}>
						<option value={null}>None</option>
						{
							props.products.map(product => {
								return <option value={Number(product.id)} key={product.id}>{product.name}</option>
							})
						}
					</select>
					<select id="quantity1" name="quantity1" className="categorySelector">
						<option value={null}>0</option>
						{
							for(var i = 1; i <= 10; i++){
								return (<option value={i} key={i})
							}
						}
					</select>
				</Col>
			</Row>
		</div>
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
			let categoryArray = []
			for (var i = 1; i <= selectorCounter; i++){
				let tempName = 'category' + i
				let targetSelect = document.getElementById(tempName)
				if (targetSelect.value !== 'None') {
					categoryArray.push(targetSelect.value)
				}
			}
			dispatch(postProduct({name: evt.target.name.value, imageURL: evt.target.imageURL.value, price: Number(evt.target.price.value), description: evt.target.description.value, quantity: Number(evt.target.quantity.value), isActive: evt.target.isActive.value}, categoryArray))
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
