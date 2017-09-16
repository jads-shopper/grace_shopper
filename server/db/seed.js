if (process.env.NODE_ENV !== 'production') require('../../secrets')
const db = require('../db')
const User = db.model('user')
const Product = db.model('product')
const Review = db.model('review')
const Category = db.model('category')
const ProductCategory = db.model('productCategory')
const Chance = require('chance')
const chance = new Chance()

const promises = []
const promisesUsers = []
const promisesReviews = []

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

Promise.all(promises)
	.then(() => Promise.all(promisesUsers))
	.then((users) => {
		console.log(users.map((user) => user.id))
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
		process.exit(0)
	})
	.catch((err) => {
		console.log(err)
		process.exit(1)
	})



