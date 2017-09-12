if (process.env.NODE_ENV !== 'production') require('../../secrets')
const User = require('./models/user')
const Product = require('./models/products')
const Review = require('./models/reviews')
const Chance = require('chance')
const chance = new Chance()

const promises = []
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
	promises.push(User.create({
		firstName: val,
		lastName : userLastName[idx],
		email    : userEmail[idx],
		password : password[idx],
		isAdmin  : isAdmin[idx],
	}))
})
// Product  seed
const name = [], category = [], imageUrl = [], price = [], description = [], quantity = [], isActive = []

for (i = 0; i < 50; i++) {
	name.push(chance.word())
	category.push(chance.word())
	imageUrl.push(chance.avatar())
	price.push(chance.floating({ fixed: 2, min: 0.01, max: 1000 }))
	description.push(chance.paragraph())
	quantity.push(chance.integer({ min: 0, max: 50 }))
	isActive.push(chance.bool())
}

name.map(( val, idx ) => {
	promises.push(Product.create({
		name       : name[idx],
		category   : category[idx],
		imageUrl   : imageUrl[idx],
		price      : price[idx],
		description: description[idx],
		quantity   : quantity[idx],
		isActive   : isActive[idx],
	}))
})

// review seed
const text = [], rating = [], productId = []

for (i = 0; i < 50; i++) {
	text.push(chance.paragraph())
	rating.push(chance.integer({ min: 1, max: 5 }))
	productId.push(chance.integer({ min: 1, max: 50 }))
}

text.map(( val, idx ) => {
	promisesReviews.push(Review.create({
		text  : text[idx],
		rating: rating[idx],
		ProductId: productId[idx],
	})
	)
	Promise.all(promises).then(() => {
		return Promise.all(promisesReviews)
	}).then(console.log)

})

