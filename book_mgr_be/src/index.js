const Koa = require('koa')
const app = new Koa()

// app.use 注册中间件，每个请求进来都会执行这个回调函数
// context => ctx 上下文，即当前请求的所有信息
// app.use((ctx) => {
//   const { path = '/' } = ctx //<==> const path = ctx.path,若ctx无path属性则默认值为'/'
//   if (path === '/user') {
//     ctx.body = '当前是user'
//   }
//   if (path === '/setting') {
//     ctx.body = '当前是setting'
//   }
// })

// 开启一个http服务，接收请求作处理并响应
app.listen(3000, () => {
  console.log('启动成功')
})
