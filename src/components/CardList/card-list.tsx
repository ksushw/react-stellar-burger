import styles from "./card-list.module.css";
import Cart from "../Cart/cart";
import { IOrder } from "../../utils/types";
import { FC } from "react";

interface ICartList {
  orders: ReadonlyArray<IOrder>;
  path: string;
}

export const CartList: FC<ICartList> = ({ orders, path }) => {
  return (
    <>
      {!!orders?.length && (
        <div className={styles.container + " custom-scroll pr-3"}>
          {[...orders].reverse().map((order) => (
            <Cart order={order} key={order._id} path={path + order._id} />
          ))}
        </div>
      )}
    </>
  );
};
