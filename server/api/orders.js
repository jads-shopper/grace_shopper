const router = require('express').Router()
const {Order, OrderProduct} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
	return Order.findAll()
		.then((orders) => {
			return res.json(orders)
		})
		.catch(next)
})

router.delete('/:orderId/:productId', (req, res, next) =>{
	return OrderProduct.findOne({
		where: {
			orderId: req.params.orderId,
			productId: req.params.productId
		}
	})
		.then((orderProduct) => {
			orderProduct.destroy()
		})
		.then(() => {
			res.send('Product on cart destroyed')
		})
		.catch(next)
})

router.post('/:orderId', (req, res, next) => {
	return Order.findById(req.params.orderId)
		.then((order) => {
			return order.update({
				fulfilled: true
			})
				.then((fufilledOrder) => {
					res.json(fufilledOrder)
				})
				.catch(next)
		})
})

router.get('/:orderId', (req, res, next) => {
	return Order.findById(req.params.orderId)
		.then((orders) => {
			return res.json(orders)
		})
		.catch(next)
})

router.get('/:userId', (req, res, next) => {
	return Order.findAll({
		where: {
			userId: req.params.userId,
			fulfilled: true
		}
	})
})

router.delete('/:orderId', (req, res, next) => {
	return Order.findById(req.params.orderId)
		.then((order) => {
			return order.destroy()
		})
		.then(() => {
			res.send('Order Destroyed')
		})
		.catch(next)
})

router.post('/', (req, res, next) => {
	return Order.findOrCreate({
		where: {
			userId: req.body.userId
		}})
		.spread((order)  => {
			order.setProducts(req.body.products)
			return order.id
		})
		.then((orderId) => {
			res.json(orderId)
		})
		.catch(next)
})
















