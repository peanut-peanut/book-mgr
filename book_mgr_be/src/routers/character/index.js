const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils');
const router = new Router({
	prefix: '/character',
});
const character = mongoose.model('Character');
// 获取角色列表
router.get('/list', async (ctx) => {
	const list = await character.find().exec();
	ctx.body = {
		code: 1,
		msg: '获取列表成功',
		data: list
	}
})

module.exports = router;