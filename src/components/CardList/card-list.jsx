import styles from "./card-list.module.css";
import Cart from "../Cart/cart";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

export default function CartList() {
  const dispatch = useDispatch();

  const { orders } = useSelector(
    (store) => ({
      totalToday: store.wsReducer.totalToday,
    }),
    shallowEqual,
  );

  return (
    <div className={styles.container + " custom-scroll pr-3"}>
      {orders.map((order) => (
        <Cart order={order} key={order._id} />
      ))}
    </div>
  );
}
