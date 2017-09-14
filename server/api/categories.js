const router = require('express').Router()
const {Category, Product} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
	Category.findAll({include: [Product]})
		.then(categories => res.json(categories))
		.catch(next)
})
