import React from 'react'
import {connect} from 'react-redux'
import {Col, Row, Button} from 'react-bootstrap'
import {editCategory, writeCategoryName} from './../store'

const mapStateToProps = function(state) {
	return {
		newCategory: state.newCategory,
		categories: state.categories
	}
}

function EditCategoryForm(props){
	const categoryId = Number(props.match.params.id)
	const theCategory = props.categories.filter(category => {
		return category.id === categoryId
	})[0]
	if(theCategory) {
		return (
			<Row>
				<Col xs={0} sm={1}>
				</Col>
				<Col xs={12} sm={11}>
					<form id="editCategoryForm" onSubmit={props.handleSubmit}>
						<div className="">
							<span>
								<h5>Name</h5>
							</span>
							<input
								className=""
								autoComplete= "off"
								type="text"
								name="categoryName"
								defaultValue={theCategory.name}
								onChange={props.handleName}
							/>
						</div>
						<Button bsStyle="info" type="submit" className="submitButton">Edit Category</Button>
						<Button bsStyle="danger" className="deleteButton">Delete Category</Button>
					</form>
				</Col>
			</Row>
		)
	} else {
		return(
			<Row>
				<Col xs={0} sm={1}>
				</Col>
				<Col xs={12} sm={11}>
					<h3>The category with id:{categoryId} does not exist.</h3>
				</Col>
			</Row>
		)
	}
}

function mapDispatchToProps (dispatch, ownProps){
	return {
		handleName: function(evt){
			dispatch(writeCategoryName(evt.target.value))
		},
		handleSubmit: function(evt){
			console.log(evt.target.categoryName.value)
			evt.preventDefault()
			dispatch(editCategory({id: Number(ownProps.match.params.id), name: evt.target.categoryName.value}))
			dispatch(writeCategoryName(''))
		}
	}
}

const EditCategoryContainer = connect(mapStateToProps, mapDispatchToProps)(EditCategoryForm)

export default EditCategoryContainer
