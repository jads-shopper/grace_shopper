
const Sequelize = require('sequelize')
const db = require('../db')


const Order = db.define('order', {
	OrderDate: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW,
		allowNull: false,
	},
	ShipDate: Sequelize.DATE,
	fulfilled: Sequelize.BOOLEAN,
})

module.exports = Order
