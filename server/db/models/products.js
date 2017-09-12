const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
	name: {
		type: Sequelize.STRING
	},
	category: {
		type: Sequelize.STRING
	},
	imageUrl: {
		type: Sequelize.STRING
	},
	price: {
		type: Sequelize.FLOAT
	},
	description: {
		type: Sequelize.TEXT
	},
	quantity: {
		type: Sequelize.INTEGER
	},
	isActive: {
		type: Sequelize.BOOLEAN
	}

})

module.exports = Product
