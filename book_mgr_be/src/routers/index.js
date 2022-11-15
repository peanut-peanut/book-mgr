const auth = require('./auth');
const invite = require('./invite-code');

module.exports = (app) => {
	app.use(auth.routes());
	app.use(invite.routes());
}