const User = require('./user')
const Order = require('./orders')
const Product = require('./products')
const Review = require('./reviews')
const Category = require('./categories')
const OrderProduct = require('./ordersProductsJoin')

Review.belongsTo(User)
Review.belongsTo(Product)

Product.belongsToMany(Category, {through: 'productCategory'})
Category.belongsToMany(Product, {through: 'productCategory'})

Order.belongsTo(User)
Order.belongsToMany(Product, {
	through:
		{model: OrderProduct,
			unique: false,
		}
})
// Product.belongsToMany(Order, {
// 	through: 'orderproduct',
// 	unique: false
// })

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
	User,
	Order,
	Product,
	Review,
	OrderProduct,
	Category
}
