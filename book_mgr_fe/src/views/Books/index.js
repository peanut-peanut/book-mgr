import { defineComponent, ref, onMounted } from 'vue';
import { book } from '@/service';
import { result, formatTimeDate } from '@/helpers/utils';
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
        title: '出版日期',
        dataIndex: 'publishDate',
      },
      {
        title: '分类',
        dataIndex: 'classify',
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
      getList();
      status.value = true;
    };
    // 清空搜索框方法
    const clear = () => {
      keyword.value = '';
      status.value = false;
      getList();
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
    };
  },
});
