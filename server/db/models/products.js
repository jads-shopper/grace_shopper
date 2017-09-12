//  DB for products

const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:8080/dajs')

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
		type     : Sequelize.INTEGER,
		allowNull: false,
	},
	description: {
		type     : Sequelize.STRING,
		allowNull: false,
	},
	quantity   : {
		type     : Sequelize.INTEGER,
		allowNull: false,
	},
	isActive   : {
		type     : Sequelize.INTEGER,
		allowNull: false,
	},
})

module.exports = Product
