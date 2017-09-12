
//  DB for products
const Sequelize = require('sequelize')
const db = require('../db')
const Product = db.define('Product', {
	name       : {
		type     : Sequelize.STRING,
		allowNull: false,
	},
	category   : {
		type     : Sequelize.STRING,
		allowNull: false,
	},
	imageURL   : {
		type        : Sequelize.STRING,
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

module.exports = Product


