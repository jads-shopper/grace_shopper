import React from 'react'
import {ListGroup, ListGroupItem} from 'react-bootstrap'
import SingleProductRating from './SingleProductRating.jsx'

export default function SingleProductReviews(props) {
    const {reviews} = props
	return (
		<div>
			<h3>Customer Reviews</h3>
			{/*TODO: Add a product ratings breakdown component here (nice to have, prob not a user story) */}
			{/*TODO: Transform review data to a more user-friendly format*/}
			<ListGroup>
				{reviews.map((review) => {
					return (
						<ListGroupItem key={review.id}>
							<p>{review.rating} {review.title}</p>
							<p>by {review.user.firstName} on {review.createdAt}</p>
							<br />
							<p>{review.text}</p>
						</ListGroupItem>
					)
				})}
			</ListGroup>
		</div>
	)
}