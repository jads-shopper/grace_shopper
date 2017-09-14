import React from 'react'
import { ListGroup, ListGroupItem, Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

const mapStateToProps = function(state) {
	return {
		products: state.products,
		categories: state.categories
	}
}

function categoriesInstance(props){
	if(props.categories){
		return (
			<Col  xs={12} sm={3}>
				<ListGroup>
					{
						props.categories.map((category, idx) => {
							return (
								<ListGroupItem key={idx} active>
									<NavLink to={`/category/${category.id}`}><h3 className='categoryH3'>{category.name}</h3></NavLink>
									<h5>Contains {category.products.length} Items</h5>
									<hr style={{margin: 7}}/>
								</ListGroupItem>
							)
						})
					}
				</ListGroup>
			</Col>
		)
	} else {
		return(<div>Error</div>)
	}
}

const CategoryContainer = connect(mapStateToProps)(categoriesInstance)

export default CategoryContainer
