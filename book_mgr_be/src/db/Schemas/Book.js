const mongoose = require('mongoose');


const BookSchema = new mongoose.Schema({
	// 书名
	name: String,
	// 价格
	price: Number,
	// 作者
	author: String,
	// 出版日期
	publishDate: String,
	// 分类
	classify: String,
})
mongoose.model('Book', BookSchema);