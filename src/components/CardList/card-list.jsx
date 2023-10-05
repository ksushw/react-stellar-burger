import styles from "./card-list.module.css";
import Cart from "../Cart/cart";
export default function CartList() {
  return (
    <div className={styles.container + " custom-scroll"}>
      <Cart />
    </div>
  );
}
