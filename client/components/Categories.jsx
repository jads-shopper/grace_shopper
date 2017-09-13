import React from 'react'
import { ListGroup, ListGroupItem, Col } from 'react-bootstrap'
import { connect } from 'react-redux'

const mapStateToProps = function(state) {
	return {
		products: state.products
	}
}

function categoriesInstance(props){
	const categoryList = ['Accessories', 'Hardware', 'Software', 'Events', 'Miscallaneous']
	if(props.products){
		return (
			<Col  xs={12} md={3}>
				<ListGroup>
					{
						categoryList.map((val, idx) => {
							let counter = 0
							props.products.forEach(product => {
								if(product.category === val) { counter++ }
							})
							return (
								<ListGroupItem key={idx} href="#" active>
									<h3>{val}</h3>
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
