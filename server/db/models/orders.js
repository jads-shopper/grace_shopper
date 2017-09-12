const Sequelize = require('sequelize')
const db = require('../db')


const Order = db.define('Order', {
	OrderDate: {
		type: Sequelize.DATE,
		allowNull: false,
	},
	ShipDate: Sequelize.DATE,
	fulfilled: Sequelize.BOOLEAN,
})
module.exports = Order
