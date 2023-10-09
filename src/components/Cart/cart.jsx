import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./cart.module.css";
import { Link } from "react-router-dom";

export default function Cart() {
  return (
    <Link to="/111" className={styles.cart + " mb-4"}>
      <p className="text text_type_digits-default">1234567890</p>
      <FormattedDate
        date={new Date("2022-10-10T17:33:32.877Z")}
        className="text_color_inactive  text_type_main-small"
      />
      <p className={styles.info + " text text_type_main-medium"}>
        The quick brown fox jumps over the lazy dog.
      </p>
      <p className={styles.info + " text text_type_main-small"}>
        The quick brown fox jumps over the lazy dog.
      </p>

      <div className={styles.ingridients}>
        <img
          src="https://media.istockphoto.com/id/1367357589/photo/red-heart-shaped-sky-at-sunset-beautiful-landscape-with-flowers-love-background-with-copy.jpg?s=612x612&w=0&k=20&c=VbyUaFaEvR_hAGtDmcbyw7X3E7KPVmW4GYxEYjbBGOk="
          alt=""
          className={styles.ingridient}
        />
      </div>
      <div className={styles.price}>
        <p className="text text_type_digits-default mr-2">12</p>
        <CurrencyIcon type="primary" />
      </div>
    </Link>
  );
}
