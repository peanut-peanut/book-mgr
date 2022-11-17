const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils');

const router = new Router({
	prefix: '/book',
});
const Book = mongoose.model('Book');
// 添加图书接口
router.post('/add', async (ctx) => {
	const {
		name,
		price,
		author,
		publishDate,
		classify,
	} = getBody(ctx);

	const book = new Book ({
		name,
		price,
		author,
		publishDate,
		classify,
	})
	const res = await book.save();
	ctx.body = {
		code: 1,
		data: res,
		msg: '添加成功',
	}
})
// 书籍表格接口
router.get('/list', async (ctx) => {
	let {
		page = 1,
		size = 5,
		keyword = '',
	} = ctx.query;
	page = Number(page);
	size = Number(size);
	const query = {};
	if (keyword) {
		query.name = keyword;
	}
	const list = await Book.find(query)
		.skip((page - 1) * size)
		.limit(size)
		.exec();
	const total = await Book.countDocuments();
	ctx.body = {
		code: 1,
		data: {
			list,
			total,
			page,
			size,
		},
		msg: '获取列表成功',
	}
})

module.exports = router;