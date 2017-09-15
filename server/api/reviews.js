
/*eslint no-mixed-spaces-and-tabs: ["error", "smart-tabs"]*/
const router = require('express').Router()
const { Review, Product } = require('../db/models')
module.exports = router
//get product reviews

router.get('/', (req,res,next) => {
	Review.findAll().then(reviews => res.json(reviews))
		.catch(next)
})

router.get('/product/:id', ( req, res, next ) => {
	const { id } = req.params
	console.log(id)
	Review.findAll({
		where: {
			productId: {
				$eq: id
			}
		}})
	      .then(review => review ? res.json(review) : res.sendStatus(404))
})

// new review
router.post('/new/', ( req, res, next ) => {
	const { userId, productId, text, rating } = req.body
	Review.create({
		text     : text,
		rating   : rating,
		ProductId: productId,
		userId   : userId,
	}).then(res.json)

})

// update review
router.put('/update/', ( req, res, next ) => {
	const { reviewId, text, rating } = req.body
	Review.findById(reviewId)
	      .then(( review ) => {
		      return review.update({
			      text  : text,
			      rating: rating,
		      }).then(res.json)
		                   .catch(next)
	      })
})

// delete review
router.delete('/delete/:id', ( req, res, next ) => {
	const { id } = req.params
	Review.findOne({
		where: {
			id: {
				$eq: id
			}
		}
	}).then(task => task.destroy({ force: true }))
})

// find all user reviews
router.get('/user/:id', ( req, res, next ) => {
	const { id } = req.params
	Review.findAll({
		where: {
			userId: {
				$eq: id
			}
		}
	}).then(res.json)
	      .catch(next)
})
