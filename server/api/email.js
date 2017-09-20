const router = require('express').Router()
const nodemailer = require('nodemailer')
module.exports = router

router.post('/', (req, res) => {
	let productsQuantitySentence = Object.keys(req.body.order).map((product, i) => {
		if (i === Object.keys(req.body.order).length - 1) {
			return 'and ' + product.quantity + ' ' + product.name + '(s) for $' + product.price
		} else {
			return product.quantity + ' ' + product.name + '(s) for $' + product.price
		}
	})

	nodemailer.createTestAccount(() => {
		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
			host: 'smtp.mailtrap.io',
			port: '2525',
			secure: false,
			auth: {
				user: '83378d8b051f06',
				pass: '9a3694480bdaa7'
			}
		})
		let mailOptions = {
			from: '355bf341-622c-2430-d374-4d0d291e69dd@ethereal.email',
			to: req.body.email,
			subject:'Order Confirmation from Developer Accessories',
			text: ` Hello! This is to confirm your recent purchase of a ${productsQuantitySentence.join(', ')}. Thank you! `
		}

		transporter.sendMail(mailOptions, (error, info) => {
			console.log(transporter)
			if (error){
				res.send('error').end()
				return console.log(error)
			} else{
				console.log('Message sent: %s', info.messageId)
				console.log('response', info.response)
				console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
				res.send('success').end()
			}
		})
	})
})





