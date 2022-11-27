import { getToken } from '@/helpers/token';
import axios from 'axios';

// 获取所有操作日志列表
export const list = (page, size) => axios.get('http://localhost:3000/forget-password/list', {
  params: {
    page,
    size,
  },
});
// 忘记密码添加
export const add = (account) => axios.post('http://localhost:3000/forget-password/add', {
  account,
});
// 重置和忽略操作
export const updateStatus = (id, status) => axios.post('http://localhost:3000/forget-password/update/status', {
  id,
  status,
});
