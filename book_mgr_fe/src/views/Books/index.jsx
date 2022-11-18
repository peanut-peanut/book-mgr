import { defineComponent, ref, onMounted } from 'vue';
import { book } from '@/service';
import { result, formatTimeDate } from '@/helpers/utils';
import { message, Modal, Input } from 'ant-design-vue';
import AddOne from './AddOne/index.vue';

export default defineComponent({
  components: {
    AddOne,
  },
  setup() {
    // add-one组件默认不显示
    const show = ref(false);
    const columns = [
      {
        title: '书名',
        dataIndex: 'name',
      },
      {
        title: '作者',
        dataIndex: 'author',
      },
      {
        title: '价格',
        dataIndex: 'price',
      },
      {
        title: '库存',
        dataIndex: 'count',
      },
      {
        title: '出版日期',
        dataIndex: 'publishDate',
      },
      {
        title: '分类',
        dataIndex: 'classify',
      },
      {
        title: '操作',
        dataIndex: 'option',
      },
    ];

    const list = ref([]); // list -> 表格渲染
    const curPage = ref(1); // curPage -> 当前页
    const total = ref(0); // total -> 全部数据条数
    const keyword = ref(''); // keyword -> 搜索关键词
    const status = ref(false); // status -> 搜索状态
    // 分页方法
    const getList = async () => {
      const res = await book.list({
        page: curPage.value,
        keyword: keyword.value,
      });
      result(res)
        .success(({ data }) => {
          const { list: l, total: t } = data;
          list.value = l;
          total.value = t;
        });
    };
    // 切页方法
    const setPage = async (page) => {
      curPage.value = page;
      getList();
    };
    // 搜索方法
    const onSearch = async () => {
      curPage.value = 1;
      getList();
      status.value = Boolean(keyword.value);
    };
    // 清空搜索框 回显所有数据
    const clear = () => {
      keyword.value = '';
      status.value = false;
      getList();
    };
    // 删除操作
    const remove = async (record) => {
      const { _id } = record;
      const res = await book.remove(_id);
      result(res)
        .success(({ msg }) => {
          message.success(msg);
          getList();
        });
    };
    // 出入库弹框
    const updateCount = async (type, record) => {
      let optionMsg = '增加';
      if (type === '2') {
        optionMsg = '减少';
      }
      Modal.confirm({
        title: `${optionMsg}的数量`,
        okText: '确认',
        cancelText: '取消',
        content: (
					<div>
						<Input class="_book_input_count" />
					</div>
        ),
        onOk: async () => {
          const el = document.querySelector('._book_input_count');
          const res = await book.updateCount({
            id: record._id,
            num: el.value,
            type,
          });
          result(res)
            .success(({ msg }) => {
              message.success(msg);
              getList();
            });
        },
      });
    };

    onMounted(async () => {
      getList();
    });
    return {
      columns,
      list,
      total,
      show,
      keyword,
      status,
      formatTimeDate,
      setPage,
      onSearch,
      clear,
      remove,
      updateCount,
    };
  },
});
