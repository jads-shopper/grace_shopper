import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { connect } from 'react-redux'

const mapStateToProps = function ( state ) {
	return {
		categories: state.categories
	}
}

export default function categoriesInstance( props ) {

	return (
		<ListGroup>
			{
				props.categories.map(( val, idx ) => {
					return (<ListGroupItem key={idx} href="#" active>{val}</ListGroupItem>)
				})
			}
		</ListGroup>
	)
}

const CategoryContainer = connect(mapStateToProps)(categoriesInstance)

export default CategoryContainer

