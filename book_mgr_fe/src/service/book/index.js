import axios from 'axios';

// 添加书籍
export const add = (form) => axios.post('http://localhost:3000/book/add', form);
// 获取书籍列表
export const list = (data) => axios.get(
  'http://localhost:3000/book/list',
  {
    params: data,
  },
);
