import { defineComponent, reactive, watch } from 'vue';
import { book } from '@/service';
import { result } from '@/helpers/utils';
import { message } from 'ant-design-vue';
import moment from 'moment';

export default defineComponent({
  props: {
    show: Boolean,
    book: Object,
  },
  setup(props, context) {
    const editForm = reactive({
      name: '',
      price: 0,
      author: '',
      publishDate: 0,
      classify: '',
    });
    // 弹框确定方法
    const submit = async () => {
      const res = await book.update({
        id: props.book._id,
        name: editForm.name,
        price: editForm.price,
        author: editForm.author,
        publishDate: editForm.publishDate.valueOf(),
        classify: editForm.classify,
      });
      result(res)
        .success(({ data, msg }) => {
          context.emit('update', data);
          message.success(msg);
          context.emit('update:show', false);
        });
    };
    // 弹框取消
    const close = () => {
      // 将show的值更新成false
      context.emit('update:show', false);
    };
    // 回显书籍信息
    watch(() => props.book, (current) => {
      Object.assign(editForm, current);
      editForm.publishDate = moment(Number(editForm.publishDate));
    });
    return {
      props,
      editForm,
      submit,
      close,
    };
  },
});
