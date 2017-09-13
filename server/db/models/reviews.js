const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
	text: {
		type: Sequelize.TEXT,
		allowNull: false
	},
})

module.exports = Review
