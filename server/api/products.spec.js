const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')
const agent = request.agent(app)

describe('Products route', () => {
	beforeEach(() => {
		return db.sync({force: true})
	})

	var sampleProduct1 = {
		name: 'Mousetrap',
		category: 'Trap',
		imageURL: 'http://static.victorpest.com/media/articles/images/83/vp_mousetrap_M210.jpg',
		price: 10.99,
		description: 'This is the best mousetrap in the world',
		quantity: 5,
		isActive: true
	}

	describe('GET /products', () => {

    	it('returns an array of products', () => {
    		return agent
				.get('/api/products')
				.expect(200)
				.expect((res) => {
    				expect(res.body).to.be.an.instanceOf(Array)
					expect(res.body).to.have.length(0)
				})
		}) // returns an array of products

		it('returns a product if there is one in the DB', () => {
			return Product.create(sampleProduct1)
				.then((product) => {
					return agent
						.get('/api/products')
						.expect(200)
						.expect((res) => {
							expect(res.body).to.be.an.instanceOf(Array)
							expect(res.body).to.have.length(1)
							expect(res.body[0].id).to.equal(product.id)
						})

				})

		})

		it('returns multiple products if there are in the DB', () => {
			var creatingProducts = []
			for (var i = 0; i < 5; i++) {
				let product = Object.assign({}, sampleProduct1, {name: `Mousetrap${i}`})
				creatingProducts.push(product)
			}
			return Promise.all(creatingProducts.map(product => Product.create(product)))
				.then((products) => {
					return agent
						.get('/api/products')
						.expect(200)
						.expect((res) => {
                        	expect(res.body).to.be.an.instanceOf(Array)
							expect(res.body).to.have.length(5)
							expect(res.body[0].id).to.equal(products[0].id)
							// expect(res.body).to.deep.equal(products)
						})


				})
		})
	})


})