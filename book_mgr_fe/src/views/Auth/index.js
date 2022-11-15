import { defineComponent, reactive } from 'vue';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons-vue';
import { auth } from '@/service';
import { message } from 'ant-design-vue';
import { result } from '@/helpers/utils';

export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
    MailOutlined,
  },
  setup() {
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
        .success((data) => {
          message.success(data.msg);
        });
    };
    return {
      regForm,
      loginForm,
      register,
      login,
    };
  },
});
