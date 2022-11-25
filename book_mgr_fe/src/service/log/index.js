import { getToken } from '@/helpers/token';
import axios from 'axios';

axios.defaults.headers.Authorization = `Bearer ${getToken()}`;

// 获取所有操作日志列表
export const list = (page, size) => axios.get('http://localhost:3000/log/list', {
  params: {
    page,
    size,
  },
});

export const remove = (id) => axios.post('http://localhost:3000/log/delete', {
  id,
});
