const db = require('../db')
const Sequelize = require('sequelize')

const OrderProduct = db.define('orderProduct', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	quantity: {
		type: Sequelize.INTEGER,
		defaultValue: 1
	}
})

OrderProduct.prototype.increment = () => {
	this.quantity += 1
}

OrderProduct.prototype.decrement = () => {
	this.quantity -= 1
}

module.exports = OrderProduct
