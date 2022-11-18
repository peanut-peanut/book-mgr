const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils');

// 出入库type，IN代表入库，OUT代表出库
const BOOK_CONST = {
	IN: 1,
	OUT: 2,
}
// 定义base前缀
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
		count,
	} = getBody(ctx);

	const book = new Book ({
		name,
		price,
		author,
		publishDate,
		classify,
		count,
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

// 删除书籍接口
router.delete('/delete/:id', async (ctx) => {
	const {
		id
	} = ctx.params;
	const delMsg = await Book.deleteOne({
		_id: id,
	})
	ctx.body = {
		data: delMsg,
		msg: '删除成功',
		code: 1,
	}
})
// 书籍出入库接口
router.post('/update/count', async(ctx) => {
	let { id, num, type } = ctx.request.body;
	num = Number(num);

	const book = await Book.findOne({
		_id: id,
	}).exec();
	// 未找到书籍
	if (!book) {
		ctx.body = {
			code: 0,
			msg: '未找到书籍',
			data: null,
		}
		return;
	}
	// 出入库操作数据处理
	if (type === BOOK_CONST.IN) {
		num = Math.abs(num);
	}
	else {
		num = -Math.abs(num);
	}
	book.count = book.count + num;
	// 判断出库数量是否超过了总库存数
	if (book.count < 0) {
		ctx.body = {
			code: 0,
			msg: '出库数超过了总库存',
			data: null,
		}
		return;
	}
	// 存入数据库
	const res = await book.save();
	ctx.body = {
		code: 1,
		msg: '操作成功',
		data: res,
	}
})

module.exports = router;