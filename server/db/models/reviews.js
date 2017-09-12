const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
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
	},
	ProductId: {
		type: Sequelize.INTEGER,
		foreignKey: true,
	}
}
)

module.exports = Review