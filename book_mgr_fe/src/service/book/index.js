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
// 删除书籍
export const remove = (id) => axios.delete(`http://localhost:3000/book/delete/${id}`);
// 出入库书籍
export const updateCount = (form) => axios.post('http://localhost:3000/book/update/count', form);
// 编辑修改书籍
export const update = (form) => axios.post('http://localhost:3000/book/update', form);
// 书籍详情页
export const detail = (id) => axios.get(`http://localhost:3000/book/detail/${id}`);
