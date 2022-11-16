import { defineComponent, ref } from 'vue';
import AddOne from './AddOne/index.vue';

export default defineComponent({
  components: {
    AddOne,
  },
  setup() {
    // add-one组件默认不显示
    const show = ref(false);
    const columns = [{
      title: '书名',
      dataIndex: 'name',
    }, {
      title: '作者',
      dataIndex: 'author',
    },
    ];
    const data = [{
      name: '西游记',
      author: '吴承恩',
    },
    {
      name: '活着',
      author: '余华',
    },
    ];
    return {
      columns,
      data,
      show,
    };
  },
});
