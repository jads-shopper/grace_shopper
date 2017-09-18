const router = require('express').Router()
const db = require('../db')
const ProductCategory = db.model('productCategory')
module.exports = router

router.get('/', (req, res, next) => {
	ProductCategory.findAll()
		.then(result => res.json(result))
		.catch(next)
})

router.post('/', (req, res, next) => {
	ProductCategory.create(req.body)
		.then((productCategory) => {
			if (productCategory) {
				res.json(productCategory)
			} else {
				res.sendStatus(404)
			}
		})
		.catch(next)
})