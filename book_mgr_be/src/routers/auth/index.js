const Router = require('@koa/router');
const mongoose = require('mongoose');

const router = new Router({
	prefix: '/auth',
});
const User = mongoose.model('User');
router.post('/register', async (ctx) => {
	const {
		account,
		password,
	} = ctx.request.body;
// 判断是否已被注册过
const flag = await User.findOne({
	account,
}).exec();
if (flag) {
	ctx.body = {
		code: 0,
		msg: '已存在该账户',
		data: null,
	}
	return;
}
const user = new User({
	account,
	password,
})
const res = await user.save();
ctx.body = {
	code: 1,
	msg: '注册成功',
	data: res,
}
})

router.post('/login', async (ctx) => {
	ctx.body = '登录成功';
})


module.exports = router;