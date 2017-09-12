const Sequelize = require('sequelize')
const db = require('../db')


const Order = db.define('Order', {
// must have orderID  (  primary key  ) , customerID  ( Foreign key to customers table ) , PaymentID ( Foreign Key to PayementTypeTable ) ,

	OrderDate: {
		type: Sequelize.DATE,
		allowNull: false,
	},
	ShipDate: {
		type: Sequelize.DATE,
	},
	fulfilled: Sequelize.BOOLEAN,
	deleted: Sequelize.BOOLEAN,
})

const OrderDetails = db.define('OrderDetails',  {


})

// orderdetailId (primary key) , orderID (foreignKey to OrderDetailsTable , ProductID ( FK to product table,

const OrderDetail = db.define('OrderDetail', {
	price: {
		type: Sequelize.DECIMAL,
		allowNull: false,
	},
	quantity: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	total: {
		// price * quantity
	},
	fullfilled: {
		type: Sequelize.BOOLEAN,
	},
})


