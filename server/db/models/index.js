const User = require('./user')
const Order = require('./orders')
const Product = require('./products')
const Review = require('./reviews')
const OrderProduct = require('./ordersProductsJoin')


Review.belongsTo(Product)
Review.belongsTo(User)

Order.belongsTo(User)
Order.belongsToMany(Product, {
	through:
		{model: OrderProduct,
			unique: false,
		}
})

module.exports = {
	User,
	Order,
	Product,
	Review
}
