const router = require('express').Router()

module.exports = router

router.post('/', (req, res, next) => {
	console.log('BODY', req.body)
	req.session.cart = req.body
	res.json(req.session).end()
})

router.get('/', (req, res, next) => {
	console.log(req.session.cart)
	res.json(req.session.cart)
})


