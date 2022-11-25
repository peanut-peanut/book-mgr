const mongoose = require('mongoose');
const { getMeta, preSave } = require('../../helpers/utils/index');

const LogSchema = new mongoose.Schema({
	user: {
		account: String,
		id: String,
	},
	request: {
		method: String,
		url: String,
		status: Number,
	},
	show: Boolean,
	startTime: Number,
	endTime: Number,
	meta: getMeta(),
})
LogSchema.pre('save', preSave);
mongoose.model('Log', LogSchema);