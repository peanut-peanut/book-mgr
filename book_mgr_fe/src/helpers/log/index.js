const LOG_MAP = [
  ['/character/list', '获取所有角色列表'],
  ['/user/info', '获取当前用户信息'],
  ['/log/list', '获取操作日志列表'],
  ['/user/list', '获取所有用户列表'],
  ['/books/list', '获取图书列表'],
];

export const getLogInfoByPath = (path) => {
  let title = '';
  LOG_MAP.forEach((item) => {
    if (path.includes(item[0])) {
      title = path.replace(item[0], item[1]);
    }
  });
  return title || path;
};
