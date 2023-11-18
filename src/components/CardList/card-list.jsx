import styles from "./card-list.module.css";
import Cart from "../Cart/cart";

export default function CartList({ orders, path }) {
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
}
