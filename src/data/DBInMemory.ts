import type { BurgerOrderType, IngredientsType, Status, StatusType } from '@/types';

const ingredients: IngredientsType = {
  breads: [
    {
      id: 1,
      type: 'Italiano Branco',
    },
    {
      id: 2,
      type: '3 Queijos',
    },
    {
      id: 3,
      type: 'Parmesão e Orégano',
    },
    {
      id: 4,
      type: 'Integral',
    },
  ],
  meats: [
    {
      id: 1,
      type: 'Maminha',
    },
    {
      id: 2,
      type: 'Alcatra',
    },
    {
      id: 3,
      type: 'Picanha',
    },
    {
      id: 4,
      type: 'Veggie burger',
    },
  ],
  optionals: [
    {
      id: 1,
      type: 'Bacon',
    },
    {
      id: 2,
      type: 'Cheddar',
    },
    {
      id: 3,
      type: 'Salame',
    },
    {
      id: 4,
      type: 'Tomate',
    },
    {
      id: 4,
      type: 'Cebola roxa',
    },
    {
      id: 4,
      type: 'Pepino',
    },
  ],
};

const status: StatusType[] = [
  {
    id: 1,
    type: 'Solicitado',
  },
  {
    id: 2,
    type: 'Em produção',
  },
  {
    id: 3,
    type: 'Finalizado',
  },
];

const burgerOrders = [] as BurgerOrderType[];

export class DBInMemory {
  private static db = {
    ingredients,
    status,
    burgerOrders,
  };

  static get ingredients() {
    return this.db.ingredients;
  }

  static get status() {
    return this.db.status;
  }

  static get burgerOrders() {
    return this.db.burgerOrders;
  }

  static insertOrder(order: BurgerOrderType[]) {
    this.db.burgerOrders = [...this.db.burgerOrders, ...order];
  }

  static changeOrderStatus(orderId: number, statusId: number) {
    this.db.burgerOrders = this.db.burgerOrders.map((order) =>
      order.id === orderId
        ? {
            ...order,
            status: this.db.status.find((status) => status.id === statusId)?.type as Status,
          }
        : order,
    );
  }

  static removeOrder(orderId: number) {
    this.db.burgerOrders = this.db.burgerOrders.filter((order) => order.id !== orderId);
  }
}
