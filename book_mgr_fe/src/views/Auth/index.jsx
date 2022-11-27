import { defineComponent, reactive } from 'vue';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons-vue';
import { auth, forgetPassword } from '@/service';
import { message, Modal } from 'ant-design-vue';
import { result } from '@/helpers/utils';
import { useRouter } from 'vue-router';
import store from '@/store';
import { getCharacterInfoById } from '@/helpers/character';
import { setToken } from '@/helpers/token';

export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
    MailOutlined,
  },
  setup() {
    // 注册路由
    const router = useRouter();
    // 注册表单
    const regForm = reactive({
      account: '',
      password: '',
      inviteCode: '',
    });
    // 注册方法
    const register = async () => {
      // 表单验证
      if (regForm.account === '' || regForm.password === '' || regForm.inviteCode === '') {
        message.info('账户密码注册码不能为空');
        return;
      }
      const res = await auth.register(regForm.account, regForm.password, regForm.inviteCode);
      result(res)
        .success((data) => {
          message.success(data.msg);
        });
    };
    // 登录表单
    const loginForm = reactive({
      account: '',
      password: '',
    });
    // 登录方法
    const login = async () => {
      // 表单验证
      if (loginForm.account === '' || loginForm.password === '') {
        message.info('账户密码不能为空');
        return;
      }
      const res = await auth.login(loginForm.account, loginForm.password);
      result(res)
        .success(({ msg, data: { user, token } }) => {
          message.success(msg);
          store.commit('setUserInfo', user);
          store.commit('setUserCharacter', getCharacterInfoById(user.character));
          setToken(token);
          router.replace('/books');
        });
    };

    const forgetPwd = async () => {
      Modal.confirm({
        title: '请输入申请重置密码的账户',
        style: 'top: 300px',
        okText: '确认',
        cancelText: '取消',
        content: (
      		<div>
      			<Input class="_forget_account" />
      		</div>
        ),
        onOk: async () => {
          const el = document.querySelector('._forget_account');
          const res = await forgetPassword.add(el.value);
          result(res)
            .success(({ msg }) => {
              message.success(`${msg}，请等待管理员处理`);
            });
        },
      });
    };
    return {
      regForm,
      loginForm,
      register,
      login,
      forgetPwd,
    };
  },
});
