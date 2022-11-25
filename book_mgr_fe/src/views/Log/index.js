import { defineComponent, onMounted, ref } from 'vue';
import { log } from '@/service';
import { result, formatFullTimeDate } from '@/helpers/utils';
import { getLogInfoByPath } from '@/helpers/log';
import { Modal, message } from 'ant-design-vue';

export default defineComponent({
  setup() {
    const columns = [
      {
        title: '用户',
        dataIndex: 'account',
        align: 'center',
      },
      {
        title: '行为',
        dataIndex: 'behavior',
        align: 'center',
      },
      {
        title: '记录时间',
        dataIndex: 'createdAt',
        align: 'center',
      },
      {
        title: '操作',
        dataIndex: 'option',
        align: 'center',
      },
    ];
    const curPage = ref(1);
    const list = ref([]);
    const total = ref(0);
    const loading = ref(true);
    // 获取操作日志表格
    const getList = async () => {
      loading.value = true;
      const res = await log.list(curPage.value, 20);
      loading.value = false;
      result(res)
        .success(({ data: { list: l, total: t } }) => {
          l.forEach((item) => {
            item.account = item.user.account;
            item.behavior = getLogInfoByPath(item.request.url);
          });
          list.value = l;
          total.value = t;
        });
    };
    const setPage = (page) => {
      curPage.value = page;
      getList();
    };
    const remove = async (record) => {
      Modal.confirm({
        title: '确定要删除此行日志吗?',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk: async () => {
          const { _id } = record;
          const res = await log.remove(_id);
          result(res)
            .success(({ msg }) => {
              message.success(msg);
              getList();
            });
        },
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
      loading,
      formatFullTimeDate,
      getList,
      setPage,
      remove,
    };
  },
});
