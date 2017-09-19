const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router

router.post('/login', (req, res, next) => {
	User.findOne({where: {email: req.body.email}})
		.then(user => {
			if (!user) {
				res.status(401).send('User not found')
			} else if (!user.correctPassword(req.body.password)) {
				res.status(401).send('Incorrect password')
			} else {
				req.login(user, err => err ? next(err) : res.json(user))
			}
		})
		.catch(next)
})

router.post('/signup', (req, res, next) => {
	User.findOrCreate({
		where: {
			email: req.body.email
		},
		defaults: {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			password: req.body.password
		}
	}
	)
		.spread((user, created) => {
			if(created) {
				req.logIn(user, (err) => {
					if(err) return next(err)
					res.json(user)
				})} else {
				res.sendStatus(401)
			}
		})
})

router.post('/logout', (req, res) => {
	req.logOut()
	res.redirect('/')
})

router.get('/me', (req, res) => {
	console.log('USER', req.user)
	res.json(req.user)
})

router.use('/google', require('./google'))
