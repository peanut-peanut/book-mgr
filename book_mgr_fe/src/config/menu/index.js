export default [
  {
    title: '图书管理',
    url: '/books',
    onlyAdmin: false,
  },
  {
    title: '用户管理',
    url: '/user',
    onlyAdmin: true,
  },
  {
    title: '操作日志',
    url: '/log',
    onlyAdmin: true,
  },
  {
    title: '其他',
    onlyAdmin: false,
    children: [
      {
        title: '书籍分类',
        url: '',
        onlyAdmin: true,
      },
      {
        title: '重置密码',
        url: '/reset/password',
        onlyAdmin: true,
      },
      {
        title: '邀请码',
        url: '',
        onlyAdmin: true,
      },
    ],
  },
];
