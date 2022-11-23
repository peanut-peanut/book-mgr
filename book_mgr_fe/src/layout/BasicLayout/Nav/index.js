import { defineComponent, onMounted, ref } from 'vue';
import menu from '@/config/menu';
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const selectedKeys = ref([]);
    const openKeys = ref([]);
    const router = new useRouter();
    const route = new useRoute();

    const to = (url) => {
      router.push(url);
    };
    onMounted(() => {
      selectedKeys.value = [route.path];
    });

    return {
      menu,
      selectedKeys,
      openKeys,
      to,
    };
  },
});
