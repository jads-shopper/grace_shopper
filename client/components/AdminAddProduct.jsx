import React from 'react'
import {connect} from 'react-redux'
import {Col, Row, Button} from 'react-bootstrap'
import {postProduct, writeProductName, writeImageURL, writePrice, writeDescription, writeQuantity, activeSelect} from './../store'

const mapStateToProps = function(state) {
	return {
		newProduct: state.newProduct,
		categories: state.categories
	}
}
let selectorCounter = 1

function addCategorySelector (categories) {
	if(selectorCounter === 5) {
		let tooManyDiv = document.createElement('h4')
		tooManyDiv.append('5 Categories is enough...')
		let targetCol = document.getElementById('categoryCol')
		targetCol.append(tooManyDiv)
		selectorCounter++

	} else if(selectorCounter < 5){
		//creates selector element
		let newSelector = document.createElement('select')
		newSelector.className= 'categorySelector'
		selectorCounter++
		newSelector.name = 'category' + selectorCounter
		newSelector.id = 'category' + selectorCounter
		let nullOption = document.createElement('option')
		nullOption.append('None')
		nullOption.key = 'null'
		nullOption.value = null
		newSelector.append(nullOption)

		//maps categories and adds them as options
		categories.forEach(category => {
			let newOption = document.createElement('option')
			newOption.append(category.name)
			newOption.key = category.id
			newOption.value = category.id
			newSelector.append(newOption)
		})

		let targetCol = document.getElementById('categoryCol')
		targetCol.append(newSelector)
	}
}

function AddProductForm(props){
	return (
		<div>
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
						<Button bsStyle="info" type="submit" className="submitButton">Create Product</Button>
					</form>
				</Col>
			</Row>
			<Row>
				<Col xs={0} sm={1}>
				</Col>
				<Col id="categoryCol" xs={12} sm={11}>
					<h5>Category</h5>
					<button id="newCat" onClick={() => {addCategorySelector(props.categories)}}>Add Another Category</button>
					<select id="category1" name="category1" className="categorySelector">
						<option value={null}>None</option>
						{
							props.categories.map(category => {
								return <option value={Number(category.id)} key={category.id}>{category.name}</option>
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
