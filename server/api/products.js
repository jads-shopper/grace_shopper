const router = require('express').Router()
const {Product, Category, Review} = require('../db/models')

module.exports = router


router.get('/', (req, res, next) => {
	Product.findAll({include: [{all: true, nested: true}]})

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
				res.status(201).json(product)
			} else {
				res.sendStatus(404)
			}
		})
		.catch(next)
})

router.put('/:id', (req, res, next) => {
	const id = +req.params.id
	Product.update(req.body, {
		where: {
			id
		}
	})
		.then(() => {
			return Product.findById(id)
		})
		.then((foundProduct) => {
			if(foundProduct) {
				res.status(200).json(foundProduct)
			} else {
				res.sendStatus(404)
			}
		})
		.catch((err) => {
			res.status(500).json(err)
		})
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
			} else {
				res.sendStatus(404)
			}
		})
		.catch(next)

})


