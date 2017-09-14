import React from 'react'
import { ListGroup, ListGroupItem, Col } from 'react-bootstrap'
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
						props.categories.map((val, idx) => {
							let counter = 0
							// props.categories.forEach(category => {
							// 	if(product.category === val) { counter++ }
							// })
							return (
								<ListGroupItem key={idx} href="#" active>
									<h3>{val.name}</h3>
									<h5>Contains {counter} Items</h5>
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
