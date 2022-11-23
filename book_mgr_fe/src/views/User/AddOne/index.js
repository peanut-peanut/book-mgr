import {
  defineComponent, reactive, ref, onMounted,
} from 'vue';
import { user } from '@/service';
import { deepClone, result } from '@/helpers/utils';
import { message } from 'ant-design-vue';
import store from '@/store';

const defaultForm = {
  account: '',
  password: '',
  character: '',
};

export default defineComponent({
  props: {
    show: Boolean,
  },
  setup(props, context) {
    const { characterInfo } = store.state;
    defaultForm.character = characterInfo[1]._id;
    // 页面表单绑定
    const addForm = reactive(deepClone(defaultForm));
    // 弹框确定方法
    const submit = async () => {
      const form = deepClone(addForm);
      // 添加书籍接口请求
      const res = await user.add(form);
      // 接口响应处理
      result(res)
        .success((data) => {
          // 初始化表单
          Object.assign(addForm, defaultForm);
          context.emit('update');
          message.success(data.msg);
          context.emit('update:show', false);
        });
    };
    // 弹框取消
    const close = () => {
      // 将show的值更新成false
      context.emit('update:show', false);
    };

    onMounted(() => {
    });
    return {
      props,
      addForm,
      characterInfo,
      submit,
      close,
    };
  },
});
