import { defineComponent, reactive, ref } from 'vue';
import { book } from '@/service';
import { deepClone, result } from '@/helpers/utils';
import { message } from 'ant-design-vue';

const defaultForm = {
  name: '',
  price: 0,
  author: '',
  publishDate: 0,
  classify: '',
  count: 0,
};

export default defineComponent({
  props: {
    show: Boolean,
  },
  setup(props, context) {
    // 页面表单绑定
    const addForm = reactive(deepClone(defaultForm));
    // 弹框确定方法
    const submit = async () => {
      const form = deepClone(addForm);
      // 格式化时间戳
      form.publishDate = addForm.publishDate.valueOf();
      // 添加书籍接口请求
      const res = await book.add(form);
      // 接口响应处理
      result(res)
        .success((data) => {
          // 初始化表单
          Object.assign(addForm, defaultForm);
          message.success(data.msg);
        });
    };
    // 弹框取消
    const close = () => {
      // 将show的值更新成false
      context.emit('update:show', false);
    };
    return {
      props,
      addForm,
      submit,
      close,
    };
  },
});
