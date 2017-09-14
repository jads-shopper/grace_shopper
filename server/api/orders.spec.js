/* global describe beforeEach it */
const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Order = db.model('order')
const OrderProduct = db.model('orderproduct')
const agent = request.agent(app)

describe('Order routes', () => {
	beforeEach(() => {
		return db.sync({force: true})
	})

	describe('GET /orders', () => {
		it('returns an array of orders via JSON', () => {
			return agent
				.get('/api/orders')
				.expect(200)
				.then(res => {
					expect(res.body).to.be.an('array')
					expect(res.body).to.have.length(0)
				})
		})
	})

	describe('GET /orders/:orderId', () => {
		let orders
		beforeEach(() => {
			return User.create({firstName: 'David', lastName: 'Ko', email: 'dk@dk.com'})
				.then(() => {
					return Order.create({userId: 1})
				})
				.then((createdOrder) => {
					orders = createdOrder
				})
		})

		it('should get the correct order from a list of orders', () => {
			const theChosenOrder = orders
			return agent
				.get(`/api/orders/${theChosenOrder.id}`)
				.expect(200)
				.expect((res) => {
					expect(res.body.id).to.equal(theChosenOrder.id)
				})
		})
	})

	// describe ('POST /orders', () => {
	// 	let order
	// 	beforeEach(() => {
	// 		return User.create({firstName: 'David', lastName: 'Ko', email: 'dk@dk.com'})
	//     .then(() => {
	//       return Order.create({userId: 1})
	//     })
	//     .then((createdOrder) => {
	//       createdOrder.setProducts([])
	//       orders = createdOrder
	//     })
	// 	})

	// 	it('should post correct order and also populate the join table', () => {
	// 		return agent
	// 			.post('/api/orders')
	// 			.send(order)
	// 			.expect(200)
	// 			.expect((res) => {
	// 				expect(res.body).to.equal(order.id)
	// 			})
	// 			.expect(OrderProduct.findOne({where: {
	// 				orderId: order.id
	// 			}
	// 			}).to.have.length(1))
	// 	})
	// })
})
