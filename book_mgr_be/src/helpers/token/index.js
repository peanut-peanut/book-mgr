const jwt = require('jsonwebtoken');
const config = require('../../project.config');
const koaJwt = require('koa-jwt');
// 将提取header中的authorization的token信息
const getToken = (ctx) => {
	let { authorization } = ctx.header;
	return authorization.replace('Bearer ', '').replace('Bearer ', '');
}

// 解析token字段
const verify = (token) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, config.JWT_SECRET, (err, payload) => {
			if (err) {
				reject(err);
				return;
			}
			resolve(payload);
		})
	})
}
// 过滤登录注册接口，不经过token验证
const middleware = (app) => {
	app.use(koaJwt({
		secret:config.JWT_SECRET,
	}).unless({
		path: [
			/^\/auth\/login/,
			/^\/auth\/register/,
			/^\/forget-password\/add/,
		],
	}))
}

const catchTokenError = async (ctx,next) => {
	return next().catch((error) => {
		if (error.status = 401) {
			ctx.status = 401
			ctx.body = {
				code: 0,
				msg: 'token error',
				data: null,
			}
		} else {
			throw error;
		}
	})
}
module.exports = {
	getToken,
	verify,
	middleware,
	catchTokenError,
}