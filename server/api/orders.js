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

router.put('/:orderId/:productId', (req, res, next) =>{
	return OrderProduct.findOne({
		where: {
			orderId: req.params.orderId,
			productId: req.params.productId
		}
	})
		.then((orderProduct) => {
			orderProduct.update({quantity: req.body.quantity})
		})
		.then(() => {
			res.send('Product on cart updated')
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
			OrderProduct.create({
				orderId: order.id,
				productId: req.body.product,
				quantity: req.body.quantity
			})
			return order.id
		})
		.then((orderId) => {
			res.json(orderId)
		})
		.catch(next)
})
















