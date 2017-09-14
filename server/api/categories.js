const router = require('express').Router()
const {Category, ProductCategory} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
	Category.findAll()
		.then(categories => res.json(categories))
		.catch(next)
})
