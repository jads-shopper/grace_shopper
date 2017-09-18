const admin = (req, res, next) => {
	console.log('USER', req.user)
	if (!req.user) {
		res.status(401).end()
	} else if (!req.user.isAdmin){
		res.status(403).end()
	} else {
		next()
	}
}


module.exports = {
	admin
}
