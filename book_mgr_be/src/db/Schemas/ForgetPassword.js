const mongoose = require('mongoose');
const { getMeta, preSave } = require('../../helpers/utils/index');

const ForgetPasswordSchema = new mongoose.Schema({
	account: String,
	status: Number,
	/*
	status
	1 未处理
	2 已处理
	3 已忽略
	*/
	meta: getMeta(),
})
ForgetPasswordSchema.pre('save', preSave);
mongoose.model('ForgetPassword', ForgetPasswordSchema);