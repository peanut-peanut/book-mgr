const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils');
const jwt = require('jsonwebtoken');
const router = new Router({
	prefix: '/auth',
});
const User = mongoose.model('User');
const InviteCode = mongoose.model('InviteCode');
// 注册接口逻辑
router.post('/register', async (ctx) => {
	const {
		account,
		password,
		inviteCode,
	} = getBody(ctx);
		// 传参校验
	if (account === '' || password === '' || inviteCode === '') {
		ctx.body = {
			code: 0,
			msg: '字段不能为空',
			data: null, 
		}
		return;
	}
	// 校验邀请码
	const findCode = await InviteCode.findOne({
		code: inviteCode,
	})
	if (!findCode) {
		ctx.body = {
			code: 0,
			msg: '邀请码错误',
			data: null,
		}
		return;
	}
	if (findCode.user) {
		ctx.body = {
			code: 0,
			msg: '邀请码已被使用',
			data: null,
		}
		return;
	}

	// 判断是否已被注册过
	const findUser = await User.findOne({
		account,
	}).exec();
	// if (findUser) {
	// 	ctx.body = {
	// 		code: 0,
	// 		msg: '已存在该账户',
	// 		data: null,
	// 	}
	// 	return;
	// }
	// 创建用户
	const user = new User({
		account,
		password,
	})
	// 创建的结果同步到mongodb
	const res = await user.save();
	// 创建后同步生成邀请码
	findCode.user = res._id;
	// findCode.meta.updatedAt = new Date().getTime();
	// 同步到mongodb
	await findCode.save();
	// 响应结果
	ctx.body = {
		code: 1,
		msg: '注册成功',
		data: res,
	}
})

// 登录接口逻辑
router.post('/login', async (ctx) => {
	const {
		account,
		password,
	} = getBody(ctx);
	// 传参校验
	if (account === '' || password === '') {
		ctx.body = {
			code: 0,
			msg: '字段不能为空',
			data: null, 
		}
		return;
	}

	// 按账户查找
	const findUser = await User.findOne({
		account,
	}).exec();
	// 找不到对应账户
	if (!findUser) {
		ctx.body = {
			code: 0,
			msg: '账户或密码错误',
			data: null, 
		}
		return;
	}
	const user = {
		account: findUser.account,
		_id: findUser._id,
	}
	// 密码正确
	if (findUser.password === password) {
		ctx.body = {
			code: 1,
			msg: '登录成功',
			data: {
				user,
				token: jwt.sign(user,'book-mgr')
			}
		}
		return;
	}
	// 密码错误
	ctx.body = {
		code: 0,
		msg: '账户或密码错误',
		data: null
	}
})


module.exports = router;