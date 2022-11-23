import { isAdmin } from '../character';

export const regDirective = (app) => {
  app.directive('only-admin', {
    mounted(el, { value = true }) {
      const res = isAdmin();
      if (!res && value) {
        el.style.display = 'none';
      }
    },
  });
};
