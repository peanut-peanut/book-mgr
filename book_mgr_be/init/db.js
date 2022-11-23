const mongoose = require('mongoose');
const { connect } = require('../src/db/index');
const { defaultCharacters } = require('../src/helpers/characters/index');

const Character = mongoose.model('Character');
connect()
	.then(async () => {
		console.log('开始初始化 角色集合');
		await Character.insertMany(defaultCharacters);
		console.log('角色集合 初始化完成');
	})
