//  DB for products
const Sequelize = require('sequelize')
const db = require('../db')
const Product = db.define('Product', {
	name       : {
		type     : Sequelize.STRING(20),
		allowNull: false,
	},
	category   : {
		type     : Sequelize.STRING(20),
		allowNull: false,
	},
	imageURL   : {
		type: Sequelize.STRING(20),
		defaultValue: '/img.png'
	},
	price      : {
		type     : Sequelize.FLOAT,
		allowNull: false,
		validate : {
			min: 0.01,
		}
	},
	description: {
		type     : Sequelize.TEXT,
		allowNull: false,
	},
	quantity   : {
		type     : Sequelize.INTEGER,
		allowNull: false,
	},
	isActive   : {
		type        : Sequelize.BOOLEAN,
		allowNull   : false,
		defaultValue: true,
	},
})


module.exports = {
	Product,
}
