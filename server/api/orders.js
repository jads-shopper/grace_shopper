const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
	return Order.create({userId: req.body.user})
		.then(order => {
			return order.setProducts(req.body.products)
		})
		.then(() => {
			res.json('Successfully Added to Join Table')
		})
		.catch(next)
})
