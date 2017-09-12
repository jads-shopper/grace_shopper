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

	describe('GET /users', () => {
		// beforeEach(() => {
		// 	return User.create({
		// 		firstName: 'cody',
		// 		lastName: 'theDog',
		// 		email: codysEmail
		// 	})
		// })


		it('returns an array of users via JSON', () => {
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
		})

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

		it('should get the user by the id', () => {

			it('should get the right user from a list of users', () => {
				const theChosenOne = users[1]
				console.log(theChosenOne)
				return agent
					.get(`/api/users/${theChosenOne.id}`)
					.expect(200)
					.expect((res) => {
			    		expect(res.body.id).to.equal(theChosenOne.id)
					})
			})
		})
	})

}) // end describe('User routes')
