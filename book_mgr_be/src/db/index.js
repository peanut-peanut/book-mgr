const mongoose = require('mongoose')

// Schema 映射了MongoDB下的集合，即文档中数据的构成
// Modal 对Schema数据进行操作的一套方法
const UserSchema = new mongoose.Schema({
  nickname: String,
  password: String,
  age: Number,
})

const UserModal = mongoose.model('User', UserSchema)

const connect = () => {
  // 连接数据库
  mongoose.connect('mongodb://127.0.0.1:27017/book-mgr')
  // 数据库打开的时候，执行的操作
  mongoose.connection.on('open', () => {
    console.log('数据库连接成功')
    const user = new UserModal({
      nickname: 'kobe',
      password: '123456',
      age: 41,
    })
    user.nickname = 'KD'
    user.age = 34
    user.save()
  })
}

connect()
