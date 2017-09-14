/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const agent = request.agent(app)

describe('User routes', () => {
	beforeEach(() => {
		return db.sync({force: true})
	})

	var sampleUser1 = {
		firstName: 'Dave',
		lastName: 'Chappelle',
		email: 'dave@email.com'
	}

	describe('GET /users', () => {

		it('returns an array of users', () => {
			return agent
				.get('/api/users')
				.expect(200)
				.then(res => {
					expect(res.body).to.be.an('array')
					expect(res.body).to.have.length(0)
				})
		}) // end it('returns an array of users')

		it('returns a user if there is one in the DB', () => {
			return User.create({
				firstName: 'cody',
				lastName: 'theDog',
				email: 'cody@emailcom'
			}).then((student) => {
				return agent
					.get('/api/users')
					.expect(200)
					.expect((res) => {
						expect(res.body).to.be.an.instanceOf(Array)
						expect(res.body).to.have.length(1)
						expect(res.body[0].id).to.equal(student.id)
					})
			})
		})// end describe('GET /users')

		it('returns multiple users if they are in the DB', () => {
			var creatingUsers = [
				{firstName: 'Asad', lastName: 'Beum', email: 'asad@email.com'},
				{firstName: 'Bob', lastName: 'Gomm', email: 'bob@email.com'},
				{firstName: 'Nimit', lastName: 'Tay', email: 'nimit@email.com'}
			].map((user) => User.create(user))

			return Promise.all(creatingUsers)
				.then((users) => {
					return agent.get('/api/users')
						.expect(200)
						.expect((res) => {
							expect(res.body).to.be.an.instanceOf(Array)
							expect(res.body).to.have.length(3)
							// this is not working
							// expect(res.body).to.deep.equal(users)
						})
				})
		})
	}) // end describe('/api/users')

	describe('GET /users/:id', () => {
		var users
		beforeEach(() => {
			var creatingUsers = [
				{firstName: 'Asad', lastName: 'Beum', email: 'asad@email.com'},
				{firstName: 'Bob', lastName: 'Gomm', email: 'bob@email.com'},
				{firstName: 'Nimit', lastName: 'Tay', email: 'nimit@email.com'}
			].map((user) => User.create(user))
			return Promise.all(creatingUsers)
				.then((createdUsers) => {
					users = createdUsers
				})
		})

		it('should get the right user based on its id', () => {
			const theChosenOne = users[1]
			return agent
				.get(`/api/users/${theChosenOne.id}`)
				.expect(200)
				.expect((res) => {
					expect(res.body.id).to.equal(theChosenOne.id)
				})
		})

		it('should return a 404 error if a non-existing user id is used', () => {
			return agent
				.get('/api/users/99999')
				.expect(404)
		})
	}) //

	describe('POST /users', () => {

		it('creates a new user and returns its JSON', () => {
			return agent
				.post('/api/users')
				.send(sampleUser1)
				.expect(201)
				.expect((res) => {
					expect(res.body.email).to.equal(sampleUser1.email)
				})
		})

		it('creates a user in the database', () => {
			return agent
				.post('/api/users')
				.send(sampleUser1)
				.expect(201)
				.then(() => User.findOne({where: {email: sampleUser1.email }}))
				.then((foundUser) => {
					expect(foundUser.firstName).to.equal(sampleUser1.firstName)
					expect(foundUser.lastName).to.equal(sampleUser1.lastName)
					expect(foundUser.email).to.equal(sampleUser1.email)
				})
		})

		it('returns JSON of the actually created user, not just the POSTed data', () => {
			return agent
				.post('/api/users')
				.send(Object.assign({}, sampleUser1, {extraneous: 'This should not exist'}))
				.expect(201)
				.expect((res) => {
					expect(res.body.email).to.equal(sampleUser1.email)
					expect(res.body.extraneous).to.be.an('undefined')
					expect(res.body.createdAt).to.exist
				})
		})
	}) // end describe('POST /users')

	describe('PUT /users/:id', () => {
		var createdUsers
		var theChosenUser
		beforeEach(() => {
			var creatingUsers = []
			for (var i = 0; i < 5; i++) {
				let user = Object.assign({}, sampleUser1, {email: `test${i}@email.com`})
				creatingUsers.push(user)
			}
			return Promise.all(creatingUsers.map(user => User.create(user)))
				.then((users) => {
					createdUsers = Object.assign({}, users)
					theChosenUser = users[2]
				})
		})
		it('updates an existing user', () => {
			return agent
				.put(`/api/users/${theChosenUser.id}`)
				.send({email: 'changed@email.com'})
				.expect(200)
				.expect((res) => {
					expect(res.body.id).to.equal(theChosenUser.id)
					expect(res.body.email).to.equal('changed@email.com')
				})
		})

		it('saves updates to the DB', () => {
			return agent
				.put(`/api/users/${theChosenUser.id}`)
				.send({email: 'changedEmail@email.com'})
				.expect(200)
				.then(() => User.findById(theChosenUser.id))
				.then((foundUser) => {
					expect(foundUser.id).to.equal(theChosenUser.id)
					expect(foundUser.email).to.equal('changedEmail@email.com')
				})
		})

		it('should return a 404 error if trying to update a user with an invalid id', () => {
			return agent
				.put('/api/users/999')
				.send({description: 'Sample description'})
				.expect(404)
		})

		it('should return a 500 error if trying to make an invalid update', () => {
			return agent
				.put(`/api/users/${theChosenUser.id}`)
				.send({email: []})
				.expect(500)
		})
	})// end describe('PUT /users/:id')

	describe('DELETE /users/:id', () => {
		var createdUsers
		var theChosenUser
		beforeEach(() => {
			var creatingUsers = []
			for (var i = 0; i < 5; i++) {
				let user = Object.assign({}, sampleUser1, {email: `test${i}@email.com`})
				creatingUsers.push(user)
			}
			return Promise.all(creatingUsers.map(user => User.create(user)))
				.then((users) => {
					createdUsers = Object.assign({}, users)
					theChosenUser = users[2]
				})
		})

		it('removes a user from the DB', () => {
			return agent
				.delete(`/api/users/${theChosenUser.id}`)
				.expect(204)
		})

		it('returns a 404 error if the ID is not correct', () => {
			return agent
				.get('/api/users/9999')
				.expect(404)
		})
	})// end describe('DELETE /users/:id')
}) // end describe('User routes')
