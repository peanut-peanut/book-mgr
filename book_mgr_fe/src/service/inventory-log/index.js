import axios from 'axios';

// 获取出入库日志列表
export const list = (type = 'IN_COUNT', page = 1, size = 20) => axios.get('http://localhost:3000/inventory-log/list', {
  params: {
    type,
    page,
    size,
  },
});
