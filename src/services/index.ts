import type { BurgerOrderType, UserType } from '@/types';
import { DBInMemory, Login } from '@/utils';

const sleep = async (maxMS: number) => {
  const ms = parseInt((Math.random() * maxMS).toString());
  await new Promise((resolve) => setTimeout(resolve, ms));
};

export const getIngredients = async () => {
  await sleep(2000);
  return DBInMemory.ingredients;
};

export const postOrder = async (order: BurgerOrderType) => {
  await sleep(2000);
  const response = await DBInMemory.insertOrder(order);
  return response;
};

export const getOrders = async () => {
  await sleep(2000);
  return DBInMemory.burgerOrders;
};

export const getOrdersStatus = async () => {
  await sleep(2000);
  return DBInMemory.status;
};

export const updateOrderStatus = async (orderId: number, statusId: number) => {
  await sleep(2000);
  const data = await DBInMemory.changeOrderStatus(orderId, statusId);
  return data;
};

export const deleteOrder = async (orderId: number) => {
  await sleep(2000);
  await DBInMemory.removeOrder(orderId);
};

export const login = async (email: string, password: string) => {
  await sleep(2000);
  const data = Login.login({ email, password } as UserType);
  return data;
};

export const tokenValidate = async (token: string) => {
  await sleep(2000);
  const data = Login.tokenValidate(token);
  return data;
};
