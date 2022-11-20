const mongoose = require('mongoose');
const { getMeta, preSave } = require('../../helpers/utils/index');
const InventoryLogSchema = new mongoose.Schema({
	type: String,
	num: Number,
	user: String,
	meta: getMeta(),
})
InventoryLogSchema.pre('save', preSave);
mongoose.model('InventoryLog', InventoryLogSchema);