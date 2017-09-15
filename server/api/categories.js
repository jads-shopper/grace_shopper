const router = require('express').Router()
const {Category, Product} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
	Category.findAll({include: [Product]})
		.then(categories => res.json(categories))
		.catch(next)
})

router.post('/', (req, res, next) => {
	Category.create(req.body)
		.then((category) => {
			if (category) {
				res.json(category)
			} else {
				res.sendStatus(404)
			}
		})
		.catch(next)
})

router.put('/:id', (req, res, next) => {
	const id = +req.params.id
	Category.update(req.body, {
		where: {
			id
		}
	})
		.then(() => {
			return Category.findById(id)
		})
		.then((foundCategory) => {
			if(foundCategory) {
				res.status(200).json(foundCategory)
			} else {
				res.sendStatus(404)
			}
		})
		.catch((err) => {
			res.status(500).json(err)
		})
})
