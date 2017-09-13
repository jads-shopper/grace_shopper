const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => res.json(products))
		.catch(console.error)
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
		.catch(console.error)
})

// router.post('/', (req, res, next) => {
// 	User.create(req.body)
// 		.then((product) => {
// 			if (product) {
// 				res.json(product)
// 			} else {
// 				res.sendStatus(404)
// 			}
// 		})
// 		.catch(console.error)
// })


