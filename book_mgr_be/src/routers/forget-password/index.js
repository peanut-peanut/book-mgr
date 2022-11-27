const Router = require('@koa/router');
const mongoose = require('mongoose');
const config = require('../../project.config');

const router = new Router({
	prefix: '/forget-password',
});
const User = mongoose.model('User');
const ForgetPassword = mongoose.model('ForgetPassword');
// 忘记密码列表接口
router.get('/list', async (ctx) => {
	let {
		page,
		size,
	} = ctx.query;
	page = Number(page);
	size = Number(size);
	const list = await ForgetPassword.find({
		status: 1,
	})
	.skip((page - 1) * size)
	.limit(size)
	.exec()
	const total = await ForgetPassword.find({
		status: 1,
	}).countDocuments().exec()

	ctx.body = {
		code: 1,
		msg: '获取列表成功',
		data: {
			total,
			list,
			page,
			size,
		}
	}
})
// 忘记密码添加接口
router.post('/add', async (ctx) => {
	const {
		account,
	} = ctx.request.body;
	const one = await User.findOne({
		account
	}).exec()
	// 未找到申请忘记密码的账户
	if (!one) {
		ctx.body = {
			code: 1,
			msg: '申请成功',
		}
		return;
	}
	const oneAccount = await ForgetPassword.findOne({
		account,
		status: 1,
	}).exec()
	// 若找到，则为已申请的账户
	if (oneAccount) {
		ctx.body = {
			code: 1,
			msg: '申请成功',
		}
		return;
	}
	// 若未找到，则视作本次添加的账户
	const addOne = new ForgetPassword ({
		account,
		status: 1,
	})
	await addOne.save();
	ctx.body = {
		code: 1,
		msg: '申请成功',
	}
})

// 忘记密码更新接口
router.post('/update/status', async (ctx) => {
	const {
		id,
		status,
	} = ctx.request.body;
	const one = await ForgetPassword.findOne({
		_id: id,
	}).exec()
	if (!one) {
		ctx.body = {
			code: 0,
			msg: '找不到对应信息',
		}
		return;
	}
	one.status = status;
	// 重置密码操作
	if (status === 2) {
		const user = await User.findOne({
			account: one.account,
		}).exec()
		if (!user) {
			ctx.body = {
				code: 0,
				msg: '未找到对应账户',
			}
			return;
		}
		user.password = config.DEFAULT_PASSWORD;
		await user.save();
	}
	await one.save();
	ctx.body = {
		code: 1,
		msg: '操作成功',
	}

})

module.exports = router;