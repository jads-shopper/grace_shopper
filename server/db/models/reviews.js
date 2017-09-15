const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	text  : {
		type     : Sequelize.TEXT,
		allowNull: false
	},
	rating: {
		type    : Sequelize.INTEGER,
		validate: {
			max: 5,
			min: 1,
		}
	}
}
)
module.exports = Review

