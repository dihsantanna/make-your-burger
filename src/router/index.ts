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
