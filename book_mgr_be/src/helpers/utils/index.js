const getMeta = () => {
	return {
		createdAt: {
			type: Number,
			default: (new Date()).getTime(),
		},
		updatedAt: {
			type: Number,
			default: (new Date()).getTime(),
		}
	}
}
// 处理修改数据时，createdAt和updatedAt的更新问题
const preSave = function (next) {
	if (this.isNew) {
		const time = Date.now();
		this['meta'].createdAt = time;
		this['meta'].updatedAt = time;
	}
	else {
		this['meta'].updatedAt = Date.now();
	}
	next();
}
const getBody = (ctx) => {
	return ctx.request.body || {};
}
module.exports = {
	getMeta,
	getBody,
	preSave,
}