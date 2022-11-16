const auth = require('./auth');
const invite = require('./invite-code');
const book = require('./book');

module.exports = (app) => {
	app.use(auth.routes());
	app.use(invite.routes());
	app.use(book.routes());
}