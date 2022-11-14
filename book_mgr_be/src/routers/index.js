const auth = require('./auth/index.js')

module.exports = (app) => {
	app.use(auth.routes())
}