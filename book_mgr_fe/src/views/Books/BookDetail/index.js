import { defineComponent, ref, onMounted } from 'vue';
import { book, inventoryLog } from '@/service';
import { useRoute, useRouter } from 'vue-router';
import { result, formatTimeDate, formatFullTimeDate } from '@/helpers/utils';
import { Modal, message } from 'ant-design-vue';
import { CheckOutlined } from '@ant-design/icons-vue';
import Update from '../Update/index.vue';

export default defineComponent({
  components: {
    Update,
    CheckOutlined,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const showUpdateModal = ref(false);
    const { id } = route.params;
    const detailMsg = ref({});
    const log = ref([]);
    const totalLog = ref(0);
    const curLogPage = ref(1);
    const typeStatus = ref('IN_COUNT');
    const columns = [
      {
        title: '数量',
        dataIndex: 'num',
        align: 'center',
      },
      {
        title: '操作时间',
        dataIndex: 'createdAt',
        align: 'center',
      },
    ];
    // 获取书籍信息
    const getDetail = async () => {
      const res = await book.detail(id);
      result(res)
        .success(({ data }) => {
          detailMsg.value = data;
          detailMsg.value.createdAt = detailMsg.value.meta.createdAt;
        });
    };
    // update触发回调函数
    const updateMsg = (newData) => {
      Object.assign(detailMsg.value, newData);
    };
    // 删除操作
    const remove = async () => {
      Modal.confirm({
        title: '确定要删除此行数据吗?',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk: async () => {
          const res = await book.remove(id);
          result(res)
            .success(({ msg }) => {
              message.success(msg);
              router.replace('/books');
            });
        },
      });
    };
    // 获取出入库日志
    const getInventoryLog = async () => {
      const res = await inventoryLog.list(typeStatus.value, curLogPage.value, 5);
      result(res)
        .success(({ data: { list, total } }) => {
          log.value = list;
          totalLog.value = total;
          console.log(list);
        });
    };
    // 切换页码
    const setLogPage = (page) => {
      curLogPage.value = page;
      getInventoryLog();
    };
    // 切换出库/入库
    const filter = (type) => {
      typeStatus.value = type;
      curLogPage.value = 1;
      getInventoryLog();
    };
    onMounted(() => {
      getDetail();
      getInventoryLog();
    });
    return {
      detailMsg,
      showUpdateModal,
      totalLog,
      curLogPage,
      columns,
      log,
      typeStatus,
      CheckOutlined,
      formatTimeDate,
      formatFullTimeDate,
      remove,
      updateMsg,
      setLogPage,
      filter,
    };
  },
});
