if (process.env.NODE_ENV !== 'production') require('../../secrets')
const User = require('./models/user')
const Product = require('./models/products')
const Chance = require('chance')
const chance = new Chance()

//user seed
const userFirstName = []
const userLastName = []
const userEmail = []
const password = []
const isAdmin = []

const promises = []

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
		lastName: userLastName[idx],
		email: userEmail[idx],
		password: password[idx],
		isAdmin: isAdmin[idx],
	}))
})
// Product  seed
const name = [], category = [] , imageUrl = [] , price  = [] , description  = [], quantity = [], isActive = []

for (i = 0; i < 50; i++) {
	name.push(chance.word())
	category.push(chance.word())
	imageUrl.push(chance.avatar())
	price.push(chance.floating({fixed:2, min: 0.01, max: 1000}))
	description.push(chance.paragraph())
	quantity.push(chance.integer({min:0 , max: 50}))
	isActive.push(chance.bool())
}

name.map((val, idx) => {
	promises.push(Product.create({
		name: name[idx],
		category: category[idx],
		imageUrl: imageUrl[idx],
		price: price[idx],
		description: description[idx],
		quantity: quantity[idx],
		isActive: isActive[idx],
	}))
})



Promise.all(promises).then(console.log)

