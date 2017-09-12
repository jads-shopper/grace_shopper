const Sequelize = require('sequelize')
const db = new Sequelize(
	'postgres://localhost:5432/jads-shopper', {
		logging: false
	}
)
module.exports = db
