//  DB for products
const Sequelize = require('sequelize')
const db = require('../db')
const Product = db.define('Products', {
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
		// add hook to validate URL format ?
	},
	price      : {
		type     : Sequelize.FLOAT,
		allowNull: false,
		validate:  {
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
	},x
	isActive   : {
		type     : Sequelize.INTEGER,
		allowNull: false,
		defaultValue: true,
	},
})

const productOrder = db.define('productOrder', {
	quantity : {
		type: Sequelize.INTEGER,
	},
	unitPrice: {
		type: Sequelize.FLOAT,
	}
})

productOrder.subTotal =  ()  => this.unitPrice * this.quantity

// productOrder.hasOne

module.exports = Product
