/* global describe beforeEach afterEach it */

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
					var chosenProduct = products[2]
					return agent
						.get('/api/products')
						.expect(200)
						.expect((res) => {
							expect(res.body).to.be.an.instanceOf(Array)
							expect(res.body).to.have.length(5)
							const filteredProduct = res.body.filter((product) => product.id === chosenProduct.id)
							expect(filteredProduct).to.have.length(1)
						})


				})
		})
	})

	describe('GET /products/:id', () => {
		var createdProducts
		var theChosenProduct
		beforeEach(() => {
			var creatingProducts = []
			for (var i = 0; i < 5; i++) {
				let product = Object.assign({}, sampleProduct1, {name: `Mousetrap${i}`})
				creatingProducts.push(product)
			}
			return Promise.all(creatingProducts.map(product => Product.create(product)))
				.then((products) => {
            		createdProducts = Object.assign({}, products)
            		theChosenProduct = products[2]
				})
		})

		it('should return the right product based on its id', () => {
			return agent
				.get(`/api/products/${theChosenProduct.id}`)
				.expect(200)
				.expect((res) => {
					expect(res.body).to.be.an.instanceOf(Object)
					expect(res.body.id).to.deep.equal(theChosenProduct.id)
				})
		})

		it('should return a 404 error if a non-existing product id is used', () => {
			return agent
				.get('/api/products/99999')
				.expect(404)
		})
	})

	describe('POST /products', () => {

		it('creates a new product and returns its JSON', () => {
			return agent
				.post('/api/products')
				.send(sampleProduct1)
				.expect(201)
				.expect((res) => {
					expect(res.body.name).to.equal(sampleProduct1.name)
				})
		})

		it('creates a product in the database', () => {
			return agent
				.post('/api/products')
				.send(sampleProduct1)
				.expect(201)
				.then(() => Product.findOne({where: {name: sampleProduct1.name}}))
				.then((foundProduct) => {
					expect(foundProduct.name).to.equal(sampleProduct1.name)
					expect(foundProduct.price).to.equal(sampleProduct1.price)
					expect(foundProduct.imageURL).to.equal(sampleProduct1.imageURL)
				})
		})

		it('returns JSON of the actually created product, not just the POSTed data', () => {
			return agent
				.post('/api/products')
				.send(Object.assign({}, sampleProduct1, {extraneous: 'this should not exist'}))
				.expect(201)
				.expect((res) => {
					expect(res.body.title).to.equal(sampleProduct1.title)
					expect(res.body.extraneous).to.be.an('undefined')
					expect(res.body.createdAt).to.exist
				})
		})

	})

	describe('PUT /products/:id', () => {
		var createdProducts
		var theChosenProduct
		beforeEach(() => {
			var creatingProducts = []
			for (var i = 0; i < 5; i++) {
				let product = Object.assign({}, sampleProduct1, {name: `Mousetrap${i}`})
				creatingProducts.push(product)
			}
			return Promise.all(creatingProducts.map(product => Product.create(product)))
				.then((products) => {
					createdProducts = Object.assign({}, products)
					theChosenProduct = products[2]
				})
		})
		it('updates an existing product', () => {
			return agent
				.put(`/api/products/${theChosenProduct.id}`)
				.send({description: 'The description should be changed'})
				.expect(200)
				.expect((res) => {
					expect(res.body.id).to.equal(theChosenProduct.id)
					expect(res.body.description).to.equal('The description should be changed')
				})
		})

		it('saves updates to the DB', () => {
			return agent
				.put(`/api/products/${theChosenProduct.id}`)
				.send({description: 'The description should be changed'})
				.expect(200)
				.then(() => Product.findById(theChosenProduct.id))
				.then((foundProduct) => {
					expect(foundProduct.id).to.equal(theChosenProduct.id)
					expect(foundProduct.description).to.equal('The description should be changed')
				})
		})

		it('should return a 404 error if trying to update a product with an invalid id', () => {
			return agent
				.put('/api/products/999')
				.send({description: 'Sample description'})
				.expect(404)
		})

		it('should return a 500 error if trying to make an invalid update', () => {
			return agent
				.put(`/api/products/${theChosenProduct.id}`)
				.send({price: 0.0})
				.expect(500)
		})
	})

	describe('DELETE /products/:id', () => {
		var createdProducts
		var theChosenProduct
		beforeEach(() => {
			var creatingProducts = []
			for (var i = 0; i < 5; i++) {
				let product = Object.assign({}, sampleProduct1, {name: `Mousetrap${i}`})
				creatingProducts.push(product)
			}
			return Promise.all(creatingProducts.map(product => Product.create(product)))
				.then((products) => {
					createdProducts = Object.assign({}, products)
					theChosenProduct = products[2]
				})
		})

		it('removes a product from the DB', () => {
			return agent
				.delete(`/api/products/${theChosenProduct.id}`)
				.expect(204)
		})

		it('returns a 404 if the ID is not correct', () => {
			return agent
				.delete('/api/products/9999')
				.expect(404)
		})
	})


})
