const mongoose = require('mongoose');
const { getMeta, preSave } = require('../../helpers/utils/index');

const InviteCodeSchema = new mongoose.Schema({
	code: String,
	user: String,
	meta: getMeta(),
})
InviteCodeSchema.pre('save', preSave);
mongoose.model('InviteCode', InviteCodeSchema);