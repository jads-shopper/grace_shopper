const router = require('express').Router()
const {Order, OrderProduct, Product, User} = require('../db/models')
const gatekeepers = require('../utils/gatekeepers')
module.exports = router

router.get('/', gatekeepers.admin, (req, res, next) => {
	return Order.findAll({include: [User, Product]})
		.then((orders) => {
			return res.json(orders)
		})
		.catch(next)
})

router.post('/admin', (req, res, next) => {
	Order.create(req.body)
		.then((order) => {
			if (order) {
				res.status(201).json(order)
			} else {
				res.sendStatus(404)
			}
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

router.put('/:id', (req, res, next) => {
	const id = +req.params.id
	Order.update(req.body, {
		where: {
			id
		}
	})
		.then(() => {
			return Order.findById(id)
		})
		.then((foundOrder) => {
			if(foundOrder) {
				res.status(200).json(foundOrder)
			} else {
				res.sendStatus(404)
			}
		})
		.catch((err) => {
			res.status(500).json(err)
		})
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
	return Order.findAll({
		where: {
			id: req.params.orderId
		},
		include: [{all: true}]
	})
		.then((orders) => {
			return res.json(orders)
		})
		.catch(next)
})

router.get('/user/:userId', (req, res, next) => {
	return Order.findAll({
		where: {
			userId: req.params.userId,
		},
		include: [{all: true}]
	})
		.then((orders) => {
			return res.json(orders)
		})
		.catch(next)
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

















