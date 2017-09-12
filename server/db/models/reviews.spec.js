/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Review = db.model('review')

describe('Review model', () => {
	beforeEach(() => {
		return db.sync({force: true})
	})

	var review = Review.build({
		text: 'sample review'
	})

	describe('attributes', () => {
		it('should be able to have a text field.', () => {
			return review.save()
				.then((review) => {
					expect(review.text).to.be.equal('sample review')
				})
		})
	}) // end Review attributes
})// end Review model