import {
  defineComponent, onMounted, reactive, ref,
} from 'vue';
import { user, character } from '@/service';
import { message, Modal } from 'ant-design-vue';
import { result, formatFullTimeDate } from '@/helpers/utils';
import { getCharacterInfoById } from '@/helpers/character';
import { EditOutlined } from '@ant-design/icons-vue';
import store from '@/store';
import AddOne from './AddOne/index.vue';

export default defineComponent({
  components: {
    AddOne,
    EditOutlined,
  },
  setup() {
    const columns = [
      {
        title: '账户',
        dataIndex: 'account',
        align: 'center',
      },
      {
        title: '角色',
        dataIndex: 'character',
        align: 'center',
      },
      {
        title: '创建日期',
        dataIndex: 'createdAt',
        align: 'center',
      },
      {
        title: '更新日期',
        dataIndex: 'updatedAt',
        align: 'center',
      },
      {
        title: '操作',
        dataIndex: 'option',
        align: 'center',
      },
    ];
    const userList = ref([]);
    const curUserPage = ref(1);
    const totalUser = ref(0);
    const show = ref(false);
    const keyword = ref('');
    const status = ref(false);
    const { characterInfo } = store.state;
    const showUpdateCharacterModal = ref(false);
    const updateForm = reactive({
      character: '',
      userId: '',
    });
    // 获取用户列表
    const getUserList = async () => {
      const res = await user.list(curUserPage.value, 5, keyword.value);
      result(res)
        .success(({ data: { list, total } }) => {
          userList.value = list;
          totalUser.value = total;
        });
    };
    // 切换页码
    const setPage = (page) => {
      curUserPage.value = page;
      getUserList();
    };
    // 删除
    const remove = async (record) => {
      Modal.confirm({
        title: '确定要删除此行数据吗?',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk: async () => {
          const { _id } = record;
          const res = await user.remove(_id);
          result(res)
            .success(({ msg }) => {
              message.success(msg);
              getUserList();
            });
        },
      });
    };
    // 更新添加用户后的页面
    const updateAddUser = () => {
      curUserPage.value = 1;
      getUserList();
    };
    // 重置密码
    const resetPassword = async (record) => {
      const { _id } = record;
      const res = await user.resetPassword({
        id: _id,
      });
      result(res)
        .success(({ msg }) => {
          message.success(msg);
        });
    };
    // 搜索方法
    const onSearch = () => {
      curUserPage.value = 1;
      getUserList();
      status.value = Boolean(keyword.value);
    };
    // 清空搜索框 回显所有数据
    const clear = () => {
      keyword.value = '';
      status.value = false;
      getUserList();
    };
    // 编辑角色
    const edit = (record) => {
      updateForm.character = record.character;
      updateForm.userId = record._id;
      showUpdateCharacterModal.value = true;
    };
    // 修改角色提交
    const submit = async () => {
      const res = await character.update(updateForm);
      result(res)
        .success(({ msg }) => {
          message.success(msg);
          showUpdateCharacterModal.value = false;
          getUserList();
        });
    };
    const close = () => {
      showUpdateCharacterModal.value = false;
    };
    onMounted(() => {
      getUserList();
    });
    return {
      columns,
      userList,
      curUserPage,
      totalUser,
      show,
      keyword,
      status,
      EditOutlined,
      showUpdateCharacterModal,
      updateForm,
      characterInfo,
      formatFullTimeDate,
      getUserList,
      setPage,
      remove,
      updateAddUser,
      resetPassword,
      onSearch,
      clear,
      getCharacterInfoById,
      edit,
      submit,
      close,
    };
  },
});
