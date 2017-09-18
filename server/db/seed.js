if (process.env.NODE_ENV !== 'production') require('../../secrets')
const db = require('../db')
const User = db.model('user')
const Product = db.model('product')
const Review = db.model('review')
const Category = db.model('category')
const ProductCategory = db.model('productCategory')
const Order = db.model('order')
const OrderProduct = db.model('orderProduct')
const Chance = require('chance')
const chance = new Chance()
const chalk = require('chalk')

const promises = []
const promisesUsers = []
const promisesReviews = []
const promisesOrders= []

//user seed
const userFirstName = [], userLastName = [], userEmail = [], password = [], isAdmin = []

for (var i = 0; i < 50; i++) {
	userFirstName.push(chance.first())
	userLastName.push(chance.last())
	userEmail.push(chance.email())
	password.push(chance.string())
	isAdmin.push(chance.bool())

}

userFirstName.map(( val, idx ) => {
	promisesUsers.push(User.create({
		firstName: val,
		lastName : userLastName[idx],
		email    : userEmail[idx],
		password : password[idx],
		isAdmin  : isAdmin[idx],
	}))
})

// Category seed

const category = ['Accessories', 'Hardware', 'Software', 'Events', 'Misc']
category.map((val, idx) => {
	promises.push(Category.create({
		name: category[idx]
	}))
})


// Product  seed
const name = [], imageUrl = [], price = [], description = [], quantity = [], isActive = []

for (i = 0; i < 50; i++) {
	// TODO: Ensure unique product names to avoid the unique product name constraint
	name.push(chance.word())
	imageUrl.push('http://lorempixel.com/200/200/')
	price.push(chance.floating({ fixed: 2, min: 0.01, max: 1000 }))
	description.push(chance.paragraph())
	quantity.push(chance.integer({ min: 0, max: 50 }))
	isActive.push(chance.bool())
}

name.map(( val, idx ) => {
	promises.push(Product.create({
		name       : name[idx],
		imageUrl   : imageUrl[idx],
		price      : price[idx],
		description: description[idx],
		quantity   : quantity[idx],
		isActive   : isActive[idx],
	}))
})

//Product category seed
const productId1 = [1,1,1], categoryId = [1,2,3]

for (i = 2; i <= 50; i++) {
	productId1.push(i)
	categoryId.push(chance.integer({ min: 1, max: 5 }))
}

productId1.map((val, idx) => {
	promises.push(ProductCategory.create({
		productId: productId1[idx],
		categoryId: categoryId[idx]
	}))
})

// review seed
const title = [], text = [], rating = [], productId = [], userId = []

for (i = 0; i < 50; i++) {
	title.push(chance.sentence())
	text.push(chance.paragraph())
	rating.push(chance.integer({ min: 1, max: 5 }))
	productId.push(chance.integer({ min: 1, max: 50 }))
	userId.push(chance.integer({min: 1, max: 50 }))
}

// orders seed
const orderDate = [], fulfilled = [], shippingAddress = [], orderUserId = []

for (i = 0; i < 10; i++){
	orderDate.push(chance.date({year: 2016}))
	fulfilled.push(chance.bool())
	shippingAddress.push(chance.address())
	orderUserId.push(i + 1)
}

orderDate.push(chance.date({year: 2016}))
fulfilled.push(chance.bool())
shippingAddress.push(chance.address())
orderUserId.push(1)

orderDate.map((val, idx) => {
	return Order.create({
		orderDate: orderDate[idx],
		fulfilled: fulfilled[idx],
		shippingAddress: shippingAddress[idx],
	})
		.then(order => {
			order.setUser(orderUserId[idx])
		})
})

// order products seed

const orderQuantity = [], orderId = [], orderProductId = []

for (i = 1; i <= 20; i++) {
	orderQuantity.push(chance.integer({min: 1, max: 3}))
	orderId.push(chance.integer({min: 1, max: 10}))
	orderProductId.push(chance.integer({min: 1, max: 50}))
}

orderQuantity.map((val, idx) => {
	promises.push(OrderProduct.create({
		quantity: orderQuantity[idx],
		orderId: orderId[idx],
		productId: orderProductId[idx]
	}))
})

// Refactor this
Promise.all(promises)
	.then(() => Promise.all(promisesUsers))
	.then(() => {
		text.map(( val, idx ) => {
			promisesReviews.push(Review.create({
				title: title[idx],
				text  : text[idx],
				rating: rating[idx],
				productId: productId[idx],
				userId: userId[idx]

			})
			)
		})
		return Promise.all(promisesReviews)
	})
	.then(() => {
		console.log(chalk.green('seed success!'))
		process.exit(0)
	})
	.catch((err) => {
		console.error(err.parent)
		console.log(chalk.blue(`if only getting ${chalk.red('duplicate key value violates unique constraint "products_name_key"')}, it is because only unique product names will be created`))
		process.exit(1)
	})


