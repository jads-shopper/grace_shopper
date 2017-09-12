const db = require('../db')
const Sequelize = require('sequelize')

const OrderProduct = db.define('orderproduct', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	}
})

module.exports = OrderProduct
