const router = require('express').Router()
const { Review } = require('../db/models')
module.exports = router

router.get('/', ( req, res, next ) => {Review.findAll().then(res.json).catch(console.error)})

router.get('/:id', ( req, res, next ) => {
	const { id } = req.params
	Review.findById(id)
	      .then(review => review ? res.json(review) : res.sendStatus(404))
})


router.post('/newReview/', ( req, res, next ) => {
	const {userId, productId , text , stars}  = req.body

	Review.create({
		text: text,

	})



})


