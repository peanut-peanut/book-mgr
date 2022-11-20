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
const InventoryLog = mongoose.model('InventoryLog');
// 封装按id查找书籍
const findBook = async (id) => {
	const one = await Book.findOne({
		_id: id,
	}).exec();
	return one;
}
// 添加书籍接口
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
		.sort({
			_id: -1,
		})
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

	const book = await findBook(id);
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
	// 出入库type
	const checkType = (type) => {
		if (type === 1) {
			return 'IN_COUNT';
		}
		else {
			return 'OUT_COUNT';
		}
	}
	// 存入数据库
	const res = await book.save();
	const log = new InventoryLog({
		num: Math.abs(num),
		type: checkType(type),
	})
	await log.save();
	ctx.body = {
		code: 1,
		msg: '操作成功',
		data: res,
	}
})
// 修改书籍接口
router.post('/update', async (ctx) => {
	const {
		id,
		...others
	} = ctx.request.body;
	const one = await findBook(id);
	// 找不到书籍
	if (!one) {
		ctx.body = {
			code: 0,
			msg: '未找到书籍',
			data: null,
		}
		return;
	}
	const newQuery = {};
	// 过滤others中空的值
	Object.entries(others).forEach(([key,value]) => {
		if (value) {
			newQuery[key] = value;
		}
	});
	// 合并
	Object.assign(one, newQuery);
	// 存入数据库
	const res = await one.save();
	ctx.body = {
		code: 1,
		msg: '修改成功',
		data: res,
	}
})
// 书籍详情页接口
router.get('/detail/:id', async (ctx) => {
	const { id } = ctx.params;
	const book = await findBook(id);
	if (!book) {
		ctx.body = {
			code: 0,
			msg: '找不到书籍',
			data: null,
		}
		return;
	}
	ctx.body = {
		code: 1,
		msg: '查询成功',
		data: book,
	}
})
module.exports = router;