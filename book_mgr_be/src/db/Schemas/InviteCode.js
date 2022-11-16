const mongoose = require('mongoose');


const InviteCodeSchema = new mongoose.Schema({
	code: String,
	user: String,
})
mongoose.model('InviteCode', InviteCodeSchema);