import { tokenValidate } from '@/services';
import { Home, Orders } from '@/views';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: Home,
  },
  {
    path: '/pedidos',
    name: 'Pedidos',
    component: Orders,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _from, next) => {
  const token = localStorage.getItem('token');

  const checkPage = to.name === 'Pedidos';

  if (checkPage && !token) {
    if (!token) {
      next({ name: 'Inicio' });
      return;
    }

    const { error } = await tokenValidate(token);

    if (checkPage && error) {
      localStorage.removeItem('token');
      next({ name: 'Inicio' });
      return;
    }
  }
  next();
});
