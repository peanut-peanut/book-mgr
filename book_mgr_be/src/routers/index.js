const auth = require('./auth');
const invite = require('./invite-code');
const book = require('./book');
const inventoryLog = require('./InventoryLog')
module.exports = (app) => {
	app.use(auth.routes());
	app.use(invite.routes());
	app.use(book.routes());
	app.use(inventoryLog.routes());
}