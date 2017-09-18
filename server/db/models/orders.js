
const Sequelize = require('sequelize')
const db = require('../db')


const Order = db.define('order', {
	orderDate: {
		type: Sequelize.DATE,
		defaultValue: Date.now()
	},
	shippingAddress: Sequelize.STRING,
	fulfilled: Sequelize.BOOLEAN,
})

Order.prototype.shipDate = function(){
	return this.orderDate + 604800000 // 7 days in milliseconds
}

module.exports = Order
