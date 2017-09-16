
//  DB for products
const Sequelize = require('sequelize')
const db = require('../db')
const Product = db.define('product', {
	name       : {
		type     : Sequelize.STRING,
		allowNull: false,
		unique: true

	},
	// category   : {
	// 	type     : Sequelize.STRING,
	// 	allowNull: false,
	// },
	imageUrl   : {
		type        : Sequelize.STRING,
		defaultValue: 'https://gear4grunts.com/images/default/product.png'
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


