const router = require('express').Router()

module.exports = router

router.post('/', (req, res, next) => {
	req.session.cart = req.body
	res.json(req.session).end()
})

router.get('/', (req, res, next) => {
	res.json(req.session.cart)
})


