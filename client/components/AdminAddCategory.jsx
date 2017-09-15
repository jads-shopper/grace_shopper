import React from 'react'
import {connect} from 'react-redux'
import {Col, Row} from 'react-bootstrap'
import {postCategory, writeCategoryName} from './../store'

const mapStateToProps = function(state) {
	return {
		newCategory: state.newCategory
	}
}

function AddCategoryForm(props){
	return (
		<Row>
			<Col xs={0} sm={1}>
			</Col>
			<Col xs={12} sm={11}>
				<form id="newCategoryForm" onSubmit={props.handleSubmit}>
					<div className="">
						<span>
							<h5>Category Name</h5>
						</span>
						<input
							className=""
							autoComplete= "off"
							type="text"
							name="categoryName"
							onChange={props.handleName}
						/>
					</div>
					<button type="submit" id="submit">Create Category</button>
				</form>
			</Col>
		</Row>
	)
}

function mapDispatchToProps (dispatch){
	return {
		handleName: function(evt){
			dispatch(writeCategoryName(evt.target.value))
		},
		handleSubmit: function(evt){
			evt.preventDefault()
			dispatch(postCategory({name: evt.target.categoryName.value}))
			dispatch(writeCategoryName(''))
		}
	}
}

const AddCategoryContainer = connect(mapStateToProps, mapDispatchToProps)(AddCategoryForm)

export default AddCategoryContainer
