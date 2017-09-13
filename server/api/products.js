const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => res.json(products))
		.catch(next)
})

router.get('/:id', (req, res, next) => {
	const {id} = req.params
	Product.findById(id)
		.then((product) => {
			if (product) {
				res.json(product)
			} else {
				res.sendStatus(404)
			}
		})
		.catch(next)
})

router.post('/', (req, res, next) => {
	Product.create(req.body)
		.then((product) => {
			if (product) {
				res.json(product)
			} else {
				res.sendStatus(404)
			}
		})
		.catch(next)
})

router.put('/:id', (req, res, next) => {
	const {id} = req.params

	Product.update(req.body, {
		where: {
			id
		}
	})
		.then((success) => {
			if (success) {
				return Product.getById(id)
			} else {
				res.sendStatus(404)
			}
		})
		.then(res.json)
		.catch(next)
})

router.delete('/:id', (req, res, next) => {
	const {id} = req.params

	Product.destroy({
		where: {
			id
		}
	})
		.then((success) => {
			if (success) {
				res.sendStatus(204)
			}
		})

})


