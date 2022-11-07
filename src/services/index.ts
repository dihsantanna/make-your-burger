import { DBInMemory } from '@/data';
import type { BurgerOrderType } from '@/types';

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
