const Router = require('@koa/router');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const router = new Router({
	prefix: '/invite',
});
const InviteCode = mongoose.model('InviteCode');
// 邀请码接口
router.post('/add', async (ctx) => {
	const code = new InviteCode({
		code: uuidv4(),
		user: '',
	})
	const saved = await code.save();
	ctx.body = {
		code: 0,
		data: saved,
		msg: '注册成功',
	}
})

module.exports = router;