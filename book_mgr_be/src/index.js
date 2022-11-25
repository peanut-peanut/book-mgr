const Koa = require('koa');
const { koaBody } = require('koa-body');
const { connect } = require('./db');
const registerRouter = require('./routers');
const cors = require('@koa/cors');
const { middleware: KoaJwtMiddleware,catchTokenError } = require('../src/helpers/token')
const { logMiddleWare } = require('../src/helpers/log');

const app = new Koa();
connect().then(() => {
	app.use(cors());
	app.use(koaBody());
	app.use(catchTokenError);
	app.use(logMiddleWare);
	KoaJwtMiddleware(app);
	registerRouter(app);
	// 开启一个http服务，接收请求作处理并响应
	app.listen(3000, () => {
		console.log('启动成功')
	})
})

