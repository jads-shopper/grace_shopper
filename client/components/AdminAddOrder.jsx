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
let numberArray = [1,2,3,4,5,6,7,8,9,10]

function addProductSelector (products) {
	//creates selector element
	let newSelector = document.createElement('select')
	newSelector.className= 'categorySelector'
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
							<select name="fulfilled" className="inputTextBox" onChange={props.handleFulfilled}>
								<option value={false}>No</option>
								<option value={true}>Yes</option>
							</select>
						</div>
						<Button bsStyle="info" type="submit" className="submitButton">Create Order</Button>
					</form>
				</Col>
			</Row>
			<Row>
				<Col xs={0} sm={1}>
				</Col>
				<Col id="productCol" xs={12} sm={11}>
					<h5>Product</h5>
					<button id="newCat" onClick={() => {addProductSelector(props.products)}}>Add Another Product</button>
					<select id="product1" name="product1" className="categorySelector">
						<option value={null}>None</option>
						{
							props.products.map(product => {
								return <option value={Number(product.id)} key={product.id}>{product.name}</option>
							})
						}
					</select>
					<select id="quantity1" name="quantity1" className="numberSelector">
						<option value={null}>0</option>
						{
							numberArray.map(number => {
								return (<option value={number} key={number}>{number}</option>)
							})
						}
					</select>
				</Col>
			</Row>
		</div>
	)
}

function mapDispatchToProps (dispatch){
	return {
		handleAddress: function(evt){
			dispatch(writeAddress(evt.target.value))
		},
		handleUserId: function(evt){
			dispatch(writeUserId(evt.target.value))
		},
		handleFulfilled: function(evt){
			dispatch(fulfilledSelect(evt.target.value))
		},
		handleSubmit: function(evt){
			evt.preventDefault()
			let productArray = []
			for (var i = 1; i <= selectorCounter; i++){
				let tempName = 'product' + i
				let targetSelect = document.getElementById(tempName)
				let quantitySelect = document.getElementById('quantity' + i)
				if (targetSelect.value !== 'None') {
					productArray.push({id: Number(targetSelect.value), quantity: Number(quantitySelect.value)})
				}
			}
			dispatch(postOrder({shippingAddress: evt.target.shippingAddress.value, userId: evt.target.userId.value, fulfilled: evt.target.fulfilled.value}, productArray))
			dispatch(writeAddress(''))
			dispatch(writeUserId(''))
			dispatch(fulfilledSelect(false))
		}
	}
}

const AddProductContainer = connect(mapStateToProps, mapDispatchToProps)(AddOrderForm)

export default AddProductContainer
