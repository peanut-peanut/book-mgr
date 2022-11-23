import axios from 'axios';

// 获取所有用户列表
export const list = (page, size, keyword) => axios.get('http://localhost:3000/user/list', {
  params: {
    page,
    size,
    keyword,
  },
});
// 添加用户
export const add = (form) => axios.post('http://localhost:3000/user/add', form);
// 删除用户
export const remove = (id) => axios.delete(`http://localhost:3000/user/delete/${id}`);
// 重置密码
export const resetPassword = (id) => axios.post('http://localhost:3000/user/reset/password', id);
// 获取用户信息
export const info = () => axios.get('http://localhost:3000/user/info');
