import axios from 'axios';
// 角色列表
export const list = () => axios.get('http://localhost:3000/character/list');
// 修改角色
export const update = (form) => axios.post('http://localhost:3000/user/update/character', form);
