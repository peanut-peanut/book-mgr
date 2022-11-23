const mongoose = require('mongoose');
const { getMeta, preSave } = require('../../helpers/utils/index');

// Schema 映射了MongoDB下的集合，即文档中数据的构成
// Modal 对Schema数据进行操作的一套方法
const CharacterSchema = new mongoose.Schema({
	title: String,
	name: String,
	power: Object,
	meta: getMeta(),
})
CharacterSchema.pre('save', preSave);
mongoose.model('Character', CharacterSchema);