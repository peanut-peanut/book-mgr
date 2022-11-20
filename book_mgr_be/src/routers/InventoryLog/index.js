const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils');


const InventoryLog = mongoose.model('InventoryLog');
// 定义base前缀
const router = new Router({
	prefix: '/inventory-log',
});

router.get('/list', async (ctx) => {
	let {
		page,
		size,
		type,
	} = ctx.query;
	page = Number(page);
	size = Number(size);
	const list = await InventoryLog.find({ type })
		.sort({
			_id: -1, // 按照加入数据库的倒序排序
		})
		.skip((page - 1) * size)
		.limit(size)
		.exec();
	const total = await InventoryLog.find({ type }).countDocuments().exec();
	ctx.body = {
		code: 1,
		msg: '查询成功',
		data: {
			total,
			list,
			page,
			size,
		},
	}
})




module.exports = router;