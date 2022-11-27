const auth = require('./auth');
const invite = require('./invite-code');
const book = require('./book');
const inventoryLog = require('./InventoryLog');
const user = require('./user')
const character = require('./character');
const log = require('./log')
const forgetPassword = require('./forget-password');

module.exports = (app) => {
	app.use(auth.routes());
	app.use(invite.routes());
	app.use(book.routes());
	app.use(inventoryLog.routes());
	app.use(user.routes());
	app.use(character.routes());
	app.use(log.routes());
	app.use(forgetPassword.routes());
}