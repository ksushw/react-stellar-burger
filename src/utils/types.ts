export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export interface IUser {
  email: string;
  name: string;
}

export interface IOrder {
  _id: string;
  ingredients: ReadonlyArray<string>;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: 26472;
}

export interface IOrders {
  wsConected?: boolean;
  orders: ReadonlyArray<IOrder> | null;
  total: number;
  totalToday: number;
}
