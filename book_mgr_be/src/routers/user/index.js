const Router = require('@koa/router');
const mongoose = require('mongoose');
const config = require('../../project.config');
const router = new Router({
	prefix: '/user',
});
const User = mongoose.model('User');

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
	} = ctx.request.body;
	const user = new User({
		account,
		password: password || '123456',
	})
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
module.exports = router;