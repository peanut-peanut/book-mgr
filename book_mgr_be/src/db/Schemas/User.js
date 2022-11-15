const mongoose = require('mongoose');

// Schema 映射了MongoDB下的集合，即文档中数据的构成
// Modal 对Schema数据进行操作的一套方法
const UserSchema = new mongoose.Schema({
	account: String,
	password: String,
})
mongoose.model('User',UserSchema)