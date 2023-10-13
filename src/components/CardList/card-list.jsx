import styles from "./card-list.module.css";
import Cart from "../Cart/cart";
import { useSelector, shallowEqual } from "react-redux";

export default function CartList({ orders }) {
  return (
    <>
      {!!orders?.length && (
        <div className={styles.container + " custom-scroll pr-3"}>
          {[...orders].reverse().map((order) => (
            <Cart order={order} key={order._id} />
          ))}
        </div>
      )}
    </>
  );
}
