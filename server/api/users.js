const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
	User.findAll({
		// explicitly select only the id and email fields - even though
		// users' passwords are encrypted, it won't help if we just
		// send everything to anyone who asks!
		attributes: ['id', 'firstName', 'lastName', 'email']
	})
		.then(users => res.json(users))
		.catch(console.error)
})

router.get('/:id', (req, res, next) => {
	const {id} = req.params
	User.findById(id)
		.then((user) => {
			if (user) {
				res.json(user)
			} else {
				res.sendStatus(404)
			}
		})
		.catch(next)
})

router.post('/', (req, res, next) => {
	User.create(req.body)
		.then((user) => {
			if (user) {
				res.status(201).json(user)
			} else {
				res.sendStatus(404)
			}
		})
		.catch(next)
})

router.put('/:id', (req, res, next) => {
	const id = +req.params.id
	User.update(req.body, {
		where: {
			id
		}
	})
		.then(() => {
			return User.findById(id)
		})
		.then((foundUser) => {
			if(foundUser) {
				res.status(200).json(foundUser)
			} else {
				res.sendStatus(404)
			}
		})
		.catch((err) => {
			res.status(500).json(err)
		})
})

router.delete('/:id', (req, res, next) => {
	const {id} = req.params

	User.destroy({
		where: {
			id
		}
	})
		.then((success) => {
			if (success) {
				res.sendStatus(204)
			} else {
				res.sendStatus(404)
			}
		})
		.catch(next)

})



