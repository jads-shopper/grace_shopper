const router = require('express').Router()
module.exports = router

router.use('/categories', require('./categories'))
router.use('/reviews', require('./reviews'))
router.use('/users', require('./users'))
router.use('/orders', require('./orders'))
router.use('/products', require('./products'))
router.use('/productCategories', require('./productCategories'))
router.use('/orderProducts', require('./orderProducts'))
router.use('/cart', require('./cart'))
router.use('/email', require('./email'))


router.use(( req, res, next ) => {
	const error = new Error('Not Found')
	error.status = 404

	next(error)
})
