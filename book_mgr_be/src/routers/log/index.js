const Router = require('@koa/router');
const mongoose = require('mongoose');

const router = new Router({
	prefix: '/log',
});
const Log = mongoose.model('Log');
//操作日志列表接口
router.get('/list', async (ctx) => {
	let {
		page,
		size,
	} = ctx.query;
	page = Number(page);
	size = Number(size);
	const list = await Log.find({
		show: true,
	})
		.sort({
			_id: -1,
		})
		.skip((page - 1) * size)
		.limit(size)   
		.exec()
	const total = await Log.countDocuments().exec();
	ctx.body = {
		code: 1,
		msg: '查询列表成功',
		data: {
			list,
			total,
			page,
			size
		}
	}
})
// 删除日志接口
router.post('/delete', async (ctx) => {
	const { id } = ctx.request.body;
	const one = await Log.findOne({
		_id: id,
	}).exec();
	if (!one) {
		ctx.body = {
			code: 0,
			msg: '无对应的信息',
			data: null,
		}
		return;
	}
	one.show = false;
	await one.save();
	ctx.body = {
		code: 1,
		msg: '删除成功',
	}

})
module.exports = router;