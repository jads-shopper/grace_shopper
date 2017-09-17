import React from 'react'

export default function SingleProductRating(props) {
	const {currentProduct} = props
	// Get average review rating
	const calcAverageRating = () => {
		return currentProduct.reviews
			.map((review) => review.rating)
			.reduce((acc, curr) => acc + curr, 0) / currentProduct.reviews.length
	}
	// Convert the average review rating to a .5 interval rating so it can be represented by stars
	const calcStarRating = (rating) => {
		const floor = Math.floor(rating)
		const ceil = Math.ceil(rating)
		const midPoint = (floor + ceil) / 2
		const difference = rating - midPoint
		if (Math.abs(difference) <= 0.25) {
			return midPoint
		} else if(difference < 0.25) {
			return floor
		} else {
			return ceil
		}
	}
	// render the star rating
	const renderStarRating = (starRating) => {
		var starRatingArr = []
		if (starRating === Math.round(starRating)) {
			console.log('equal to rounded')
			for (var i = 0; i < starRating; i++) {
				starRatingArr.push('full')
			}
			var j = 0
			return starRatingArr.map(() => {
				return (
					<a key={j++} href="#"><i className="fa fa-star"></i></a>
				)
			})
		} else {
			console.log('starrating not equal to rounded', starRating, Math.round(starRating))
			for (var i = 0; i < starRating - 1; i++) {
				console.log(i)
				starRatingArr.push('full')
			}
			starRatingArr.push('half')

			return starRatingArr.map((type) => {
				if (type === 'full') {
					return (
						<a key={j++} href="#"><i className="fa fa-star"></i></a>
					)
				} else {
					return (
						<a key={j++} href="#"><i className="fa fa-star-half-o"></i></a>
					)
				}
			})
		}
	}

	const starRating = calcStarRating(calcAverageRating())

	return (
	    <div>
			{renderStarRating(starRating)}
			<br />
			{/*TODO: Determine whether this should be a anchor tag or whatnot*/}
			<a href="#">{currentProduct.reviews.length} customer reviews</a>
		</div>
	)
}
