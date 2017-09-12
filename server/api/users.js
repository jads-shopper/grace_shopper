const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
	User.findAll({
		// explicitly select only the id and email fields - even though
		// users' passwords are encrypted, it won't help if we just
		// send everything to anyone who asks!
		attributes: ['id', 'email']
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


