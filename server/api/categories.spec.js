const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Categories = db.model('category')
const agent = request.agent(app)

describe('Categories route', () => {
	beforeEach(() => {
		return db.sync({force: true})
	})

	var sampleCategory1 = {
		name: 'Computers'
	}

	describe('GET /categories', () => {
		it('returns an array of categories', () => {
			return agent
				.get('/api/categories')
				.expect(200)
				.expect((res) => {
					expect(res.body).to.be.an.instanceOf(Array)
					expect(res.body).to.have.length(0)
				})
		}) // returns an array of categories

		it('returns a category if there is one in the DB', () => {
			return Categories.create(sampleCategory1)
				.then((categories) => {
					return agent
						.get('/api/categories')
						.expect(200)
						.expect((res) => {
							expect(res.body).to.be.an.instanceOf(Array)
							expect(res.body).to.have.length(1)
							expect(res.body[0].id).to.equal(categories.id)
							expect(res.body[0].name).to.equal('Computers')
						})

				})

		})
	})


})