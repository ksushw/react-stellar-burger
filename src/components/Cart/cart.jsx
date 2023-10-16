import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./cart.module.css";
import { Link } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import { useEffect, useState } from "react";

export default function Cart({ order, path }) {
  const [ingridients, setIngridients] = useState([]);
  const [price, setPrice] = useState([]);
  const [status, setStatus] = useState("");

  const { items } = useSelector(
    (store) => ({
      items: store.ingredientReducer.items,
    }),
    shallowEqual,
  );

  const findIngridients = () => {
    const ingridients = order.ingredients.map(
      (id) => items.filter((item) => item._id === id)[0],
    );
    const price = ingridients.reduce(
      (wholePrice, ingridient) => wholePrice + ingridient.price,
      0,
    );
    setIngridients(ingridients);
    setPrice(price);
  };

  const rewriteStatus = () => {
    const status =
      (order.status === "created" && "Создан") ||
      (order.status === "pending" && "Готовится") ||
      (order.status === "done" && "Выполнен");
    setStatus(status);
  };

  useEffect(() => {
    findIngridients();
    rewriteStatus();
  }, []);

  return (
    <Link state={{ popup: true }} to={path} className={styles.cart + " mb-4"}>
      <p className="text text_type_digits-default">{"#" + order.number}</p>
      <FormattedDate
        date={new Date(order.createdAt)}
        className="text_color_inactive  text_type_main-small"
      />
      <p className={styles.info + " text text_type_main-medium"}>
        {order.name}
      </p>
      <p
        className={
          styles.info +
          " text text_type_main-small " +
          (order.status === "done" && styles.done)
        }
      >
        {status}
      </p>
      <div className={styles.ingridients}>
        {ingridients.slice(0, 4).map((ingridient) => (
          <img
            src={ingridient.image}
            alt={ingridients.name}
            className={styles.ingridient}
          />
        ))}
        {ingridients.length === 5 && (
          <img
            src={ingridients[4].image}
            alt={ingridients[4].name}
            className={styles.ingridient}
          />
        )}
        {ingridients.length > 5 && (
          <div className={styles.ingridient}>
            <img
              src={ingridients[4].image}
              alt={ingridients[4].name}
              className={styles.ingridient}
            />
            <p
              className={
                styles.ingridient_number + " text text_type_digits-default"
              }
            >
              {"+" + (ingridients.length - 4)}
            </p>
          </div>
        )}
      </div>
      <div className={styles.price}>
        <p className="text text_type_digits-default mr-2">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
    </Link>
  );
}
