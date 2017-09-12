const Sequelize = require('sequelize')
const db = new Sequelize(
	'postgres://localhost:5432/graceshopper', {
		logging: false
	}
)
module.exports = db
