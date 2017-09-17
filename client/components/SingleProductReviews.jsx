import React from 'react'
import {ListGroup, ListGroupItem} from 'react-bootstrap'

export function SingleProductReviews(props) {
    const {reviews} = props
	return (
		<div>
			<h3>Customer Reviews</h3>
			{/*TODO: Add a title to the review model and ensure that all reviews have a user */}
			<ListGroup>
				{reviews.map((review) => {
					return (
						<ListGroupItem key={review.id}>
							<p>{review.rating} {review.title}</p>
							<p>by {review.userId} on {review.createdAt}</p>
							<br />
							<p>{review.text}</p>
						</ListGroupItem>
					)
				})}
			</ListGroup>
		</div>
	)
}