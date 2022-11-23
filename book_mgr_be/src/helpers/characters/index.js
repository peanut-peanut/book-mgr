/* 
-1:无任何权限
0: 拥有所有权限
1: 查看权限
2: 添加权限
3: 修改权限
4: 删除权限
*/
const defaultCharacters = [
	{
		title: '管理员',
		name: 'admin',
		power: {
			user: [0],
			book: [0],
		},
	},
	{
		title: '成员',
		name: 'member',
		power: {
			user: [-1],
			book: [1,2],
		},
	},
]
module.exports = {
	defaultCharacters,
}