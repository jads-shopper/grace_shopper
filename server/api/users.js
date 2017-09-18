const router = require('express').Router()
const {User} = require('../db/models')
const gatekeepers = require('../utils/gatekeepers')
module.exports = router

router.get('/',gatekeepers.admin, (req, res, next) => {
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
		.catch(console.error)
})

router.post('/', (req, res, next) => {
	User.create(req.body)
		.then((user) => {
			if (user) {
				res.json(user)
			} else {
				res.sendStatus(404)
			}
		})
		.catch(console.error)
})

router.put('/:id', function (req, res, next) {
	User.findById(req.params.id)
		.then(user => {
			return user.update(req.body, {fields: ['firstName', 'lastName', 'email', 'isAdmin']})
		})
		.then(response => res.json(response))
		.catch(next)
})


