import type { BurgerOrderType, IngredientsType, Status, StatusType, UserType } from '@/types';

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

const storage = localStorage.getItem('burgerOrder');

const burgerOrders = (storage ? JSON.parse(storage) : []) as BurgerOrderType[];

const setOrderInStorage = (order: BurgerOrderType[]) => {
  localStorage.setItem('burgerOrder', JSON.stringify(order));
};

const secret = 'umaSenhaMuitoDificil';

export class DBInMemory {
  private static db = {
    ingredients,
    status,
    burgerOrders,
  };

  private static _id = storage ? burgerOrders.at(-1)!.id + 1 : 1;

  private static users: UserType[] = [
    {
      id: 1,
      email: 'admin@user.com',
      password: '12345678',
    },
  ];

  static get ingredients() {
    return this.db.ingredients;
  }

  static get status() {
    return this.db.status;
  }

  static get burgerOrders() {
    return this.db.burgerOrders;
  }

  static getUser(email: string) {
    const data = this.users.find((user) => user.email === email);
    return data;
  }

  static async insertOrder(order: BurgerOrderType): Promise<BurgerOrderType> {
    const newOrder = { ...order, id: this._id, status: 'Solicitado' } as BurgerOrderType;
    this.db.burgerOrders = [...this.db.burgerOrders, newOrder];
    setOrderInStorage(this.db.burgerOrders);
    this._id++;
    return newOrder;
  }

  static async changeOrderStatus(orderId: number, statusId: number): Promise<BurgerOrderType> {
    const status = this.db.status.find((status) => status.id === statusId)?.type as Status;
    let updatedOrder = {} as BurgerOrderType;
    this.db.burgerOrders = this.db.burgerOrders.map((order) => {
      if (order.id === orderId) {
        updatedOrder = { ...order, status };
        return updatedOrder;
      }
      return order;
    });

    setOrderInStorage(this.db.burgerOrders);

    return updatedOrder;
  }

  static async removeOrder(orderId: number) {
    this.db.burgerOrders = this.db.burgerOrders.filter((order) => order.id !== orderId);
    setOrderInStorage(this.db.burgerOrders);
  }
}
