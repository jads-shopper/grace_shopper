const router = require('express').Router()
const {OrderProduct} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
	OrderProduct.findAll()
		.then(result => res.json(result))
		.catch(next)
})

router.post('/', (req, res, next) => {
	OrderProduct.create(req.body)
		.then((orderProduct) => {
			if (orderProduct) {
				res.json(orderProduct)
			} else {
				res.sendStatus(404)
			}
		})
		.catch(next)
})