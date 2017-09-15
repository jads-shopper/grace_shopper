import React from 'react'
import {connect} from 'react-redux'
import {Row, Col, Carousel} from 'react-bootstrap'

export function SingleProductView(props) {
	const productId = +props.match.params.id
    console.log(props.products, productId)
	const currentProduct = props.products.filter((product) => product.id === productId)[0]
	console.log(currentProduct)
	return (
		<Row>
			<Col md={3}>
				<Carousel>
					<Carousel.Item>
						<img width={900} height={500} alt="900x500" src="https://cdn.shopify.com/s/files/1/1586/4957/products/Fidget-Cube-Vinyl-Desk-Toy-Squeeze-Fun-Stress-Reliever-Anti-Irritability-Juguet-Dice-Cube-Box-for_2_800x.jpg?v=1495313963"/>
					</Carousel.Item>
					<Carousel.Item>
						<img width={900} height={500} alt="900x500" src="https://cdn.shopify.com/s/files/1/1586/4957/products/Fidget-Cube-Vinyl-Desk-Toy-Squeeze-Fun-Stress-Reliever-Anti-Irritability-Juguet-Dice-Cube-Box-for_4_530x.jpg?v=1495313963"/>
					</Carousel.Item>
					<Carousel.Item>
						<img width={900} height={500} alt="900x500" src="https://cdn.shopify.com/s/files/1/1586/4957/products/Fidget-Cube-Vinyl-Desk-Toy-Squeeze-Fun-Stress-Reliever-Anti-Irritability-Juguet-Dice-Cube-Box-for_7_530x.jpg?v=1495313963"/>
					</Carousel.Item>
				</Carousel>
			</Col>
			<Col md={5}>
                <div>

                </div>
                {/*<div className="card" style={{width: "20rem"}}>*/}
                    {/*<div className="card-body">*/}
                        {/*<h4 className="card-title">${currentProduct.name}</h4>*/}
                        {/*<h6 className="card-subtitle mb-2 text-muted">${currentProduct.price}</h6>*/}
                        {/*<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>*/}
                        {/*<a href="#" className="card-link">Card link</a>*/}
                        {/*<a href="#" className="card-link">Another link</a>*/}
                    {/*</div>*/}
                {/*</div>*/}
			</Col>
			<Col md={3}>

            </Col>
		</Row>
	)
}

const mapStateToProps = ({products}) => ({products})

export default connect(mapStateToProps, null)(SingleProductView)



