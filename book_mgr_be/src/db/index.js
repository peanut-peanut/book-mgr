const mongoose = require('mongoose');
require('./Schemas/User');
require('./Schemas/InviteCode');
require('./Schemas/Book');
require('./Schemas/InventoryLog');

const connect = () => { 
  return new Promise((resolve) => {
    // 连接数据库
    mongoose.connect('mongodb://127.0.0.1:27017/book-mgr')
    // 数据库打开的时候，执行的操作
    mongoose.connection.on('open', () => {
      console.log('数据库连接成功')
		})
		resolve();
  })
}

module.exports = {
  connect,
}
