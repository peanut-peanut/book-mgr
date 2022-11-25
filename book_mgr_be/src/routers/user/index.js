const Router = require('@koa/router');
const mongoose = require('mongoose');
const config = require('../../project.config');
const { getToken, verify } = require('../../helpers/token');
const router = new Router({
	prefix: '/user',
});
const User = mongoose.model('User');
const Character = mongoose.model('Character');
// 获取用户列表
router.get('/list', async (ctx) => { 
	let {
		page,
		size,
		keyword = '',
	} = ctx.query
	page = Number(page);
	size = Number(size);
	const query = {};
	if (keyword) {
		query.account = keyword;
	}
	const list = await User.find(query)
		.sort({
			_id: -1,
		})
		.skip((page - 1) * size)
		.limit(size)
		.exec()
	const total = await User.countDocuments().exec();
	ctx.body = {
		code: 1,
		msg: '获取列表成功',
		data: {
			list,
			page,
			size,
			total,
		},
	}
})
// 添加用户
router.post('/add', async (ctx) => {
	const {
		account,
		password,
		character,
	} = ctx.request.body;
	const user = new User({
		account,
		password: password || '123456',
		character,
	})
	const char = await Character.find({
		_id: character,
	})
	if (!char) {
		ctx.body = {
			code: 0,
			msg: '找不到该角色',
			data: null,
		}
		return;
	}
	const res = await user.save();
	ctx.body = {
		code: 1,
		msg: '添加成功',
		data: res,
	}
})
// 删除用户
router.delete('/delete/:id', async (ctx) => {
	const { id } = ctx.params;
	const deleteUser = await User.deleteOne({
		_id: id,
	})
	ctx.body = {
		code: 1,
		msg: '删除成功',
		data: deleteUser,
	}
})
// 重置密码
router.post('/reset/password', async (ctx) => {
	const { id } = ctx.request.body;
	const user = await User.findOne({
		_id: id,
	}).exec()
	if (!user) {
		ctx.body = {
			code: 0,
			msg: '未找到该用户',
			data: null,
		}
		return;
	}
	user.password = config.DEFAULT_PASSWORD;
	const res = await user.save();
	ctx.body = {
		code: 1,
		msg: '修改成功',
		data: {
			account: res.account,
			_id: res._id,
		}
	}

})
// 修改用户角色
router.post('/update/character', async (ctx) => {
	const {
		character,
		userId
	} = ctx.request.body;
	// 判断角色是否存在
	const char = await Character.findOne({
		_id: character,
	}).exec()
	if (!char) {
		ctx.body = {
			code: 0,
			msg: '未找到角色信息',
			data: null,
		}
		return;
	}
	// 判断用户是否存在
	const one = await User.findOne({
		_id: userId,
	}).exec()
	if (!one) {
		ctx.body = {
			code: 0,
			msg: '未找到该用户',
			data: null,
		}
		return;
	}
	one.character = character;
	// 存入数据库
	const res = await one.save();
	ctx.body = {
		code: 1,
		msg: '修改成功',
		data: res,
	}
})

// 返回用户信息
router.get('/info', async (ctx) => {
	ctx.body = {
		code: 1,
		msg: '获取用户信息成功',
		data: await verify(getToken(ctx)),
		// data: ctx,
	}
})
module.exports = router;