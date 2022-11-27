import { defineComponent, onMounted, ref } from 'vue';
import { forgetPassword } from '@/service';
import { result } from '@/helpers/utils';
import { message } from 'ant-design-vue';

export default defineComponent({
  setup() {
    const columns = [
      {
        title: '申请账户',
        dataIndex: 'account',
        align: 'center',
      },
      {
        title: '操作',
        dataIndex: 'option',
        align: 'center',
      },
    ];
    const curPage = ref(1);
    const total = ref(0);
    const list = ref([]);

    // 获取重置密码用户列表
    const getList = async () => {
      const res = await forgetPassword.list(curPage.value, 10);
      result(res)
        .success(({ data: { list: l, total: t } }) => {
          list.value = l;
          total.value = t;
        });
    };
    // 切页
    const setPage = (page) => {
      curPage.value = page;
      getList();
    };
    // 重置和忽略操作
    const update = async (id, status) => {
      const res = await forgetPassword.updateStatus(id, status);
      result(res)
        .success(({ msg }) => {
          message.success(msg);
          getList();
        });
    };
    onMounted(() => {
      getList();
    });
    return {
      columns,
      curPage,
      total,
      list,
      getList,
      setPage,
      update,
    };
  },
});
