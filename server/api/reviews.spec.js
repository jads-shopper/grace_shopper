/* global describe beforeEach it */
/*eslint no-mixed-spaces-and-tabs: ["error", "smart-tabs"]*/

const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Product = db.model('product')
const Review = db.model('review')
const agent = request.agent(app)

describe('Reviews routes', () => {
	beforeEach(() => {
		db.sync({})

		Promise.all('12345'.split('').map(( val, idx ) => {
			return Object.assign({}, sampleProduct, { name: `computer lol ${idx}` })
		}).map(prd => Product.create(prd)).concat(
			'12345'.split('').map(( val, idx ) => {
				return Object.assign({}, sampleUser, { email: `lolzer${idx}@gmail.com` })
			}).map(us => User.create(us)))
		)

	})

	//set up test models
	const sampleProduct = {
		name       : 'Mousetrap',
		category   : 'Trap',
		imageURL   : 'http://static.victorpest.com/media/articles/images/83/vp_mousetrap_M210.jpg',
		price      : 10.99,
		description: 'This is the best mousetrap in the world',
		quantity   : 5,
		isActive   : true

	}
	const sampleUser = {
		firstName: 'Bob',
		lastName : 'Corker',
		email    : 'gosdfog@gmail.com',
	}

	let review
	let product
	let user

	describe('get /products:id', () => {

		it('should get the correct review for a given product ', () => {

			Review.create({ text: 'product sux', rating: 3, productId: 3, userId: 2 }).then(() => {
				return agent.get('/api/reviews/product/3').expect(( res ) => {
					expect(res.body.productId).to.equal(3)
				})
			})
		})
	})

	describe('should get all reviews from specific userId', () => {

		it('should get all reviews by user ', () => {

			Promise.all('1234'.map(( v, idx ) => ({ text: 'product sux', rating: 5, productId: idx, userId: 2 })
				.map(( val ) => Review.create(val))))
			       .then(() => {
				       return agent.get('/api/reviews/user/3').expect(( res ) => {
					       expect(res.body.userId).to.equal(2)
					       expect(res.body.length).to.equal(4)
				       })
			       })
		})
	})
})
// 		'12345'.split('').map(( val, idx ) => {
// 		}).map(user => User.create(user))
// return Object.assign({}, sampleUser, { name: `Boris lol ${idx}` })
//              .then(console.log)
// 		// .map((val ,idx) => Product.create(product[idx])))
