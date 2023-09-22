import styles from "./card-list.module.css";
import Cart from "../cart/cart";
export default function CartList() {
  return (
    <div className={styles.container + " custom-scroll"}>
      <Cart />
    </div>
  );
}
