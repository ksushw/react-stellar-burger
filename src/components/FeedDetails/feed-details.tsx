import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed-details.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState, FC } from "react";
import { useSelector } from "../../services/types/hooks";
import { uniq } from "lodash";
import { IIngredient, IOrder } from "../../utils/types";

interface IFeedDetails {
  orders: ReadonlyArray<IOrder>;
}

export const FeedDetails: FC<IFeedDetails> = ({ orders }) => {
  const [order, setOrder] = useState<IOrder>();
  const [ingridients, setIngridients] = useState<ReadonlyArray<IIngredient>>();
  const [amount, setAmount] = useState<Record<string, number>>();
  const [price, setPrice] = useState<number>();
  const { orderId } = useParams();

  const items = useSelector((store) => store.ingredientReducer.items);

  useEffect(() => {
    const item = orders.find((item) => {
      return item._id === orderId;
    });
    if (item) {
      setOrder(item);
    }
  }, [orders, orderId]);

  useEffect(() => {
    const inicId = uniq(order?.ingredients);
    const ingridients = inicId?.map(
      (id) => items.filter((item) => item._id === id)[0],
    );
    const price = ingridients?.reduce(
      (wholePrice, ingridient) => wholePrice + ingridient.price,
      0,
    );
    setIngridients(ingridients);
    setPrice(price);

    const count = order?.ingredients?.reduce(
      (accumulator, value) => {
        return {
          ...accumulator,
          [value]: (accumulator[value] || 0) + 1,
        };
      },
      {} as Record<string, number>,
    );
    setAmount(count);
  }, [order]);

  const rewriteStatus = () => {
    const status =
      (order?.status === "created" && "Создан") ||
      (order?.status === "pending" && "Готовится") ||
      (order?.status === "done" && "Выполнен");
    return status;
  };

  return (
    <>
      <>
        {!!JSON.stringify(order) && !!ingridients?.length ? (
          <div>
            <div className={styles.container + " custom-scroll"}>
              <p className={styles.number + " text text_type_digits-medium"}>
                {"#" + order?.number}
              </p>
              <p className={styles.name + " text text_type_main-medium mt-10"}>
                {order?.name}
              </p>
              <p className={styles.state + " text text_type_main-small mt-3"}>
                {rewriteStatus()}
              </p>
              <p className="text text_type_main-medium mt-15">Состав:</p>
              <div className={styles.ingridients + " mt-6 pr-6 custom-scroll"}>
                {ingridients.map((ingridient) => (
                  <div
                    className={styles.ingridient + " mb-3"}
                    key={ingridient._id + order?._id}
                  >
                    <img
                      src={ingridient.image}
                      alt={ingridient.name}
                      className={styles.image}
                    />
                    <p className="text text_type_main-default">
                      {ingridient.name}
                    </p>
                    <p className="text text_type_digits-default">
                      {amount?.[ingridient._id]} x {ingridient.price}
                    </p>
                    <CurrencyIcon type="primary" />
                  </div>
                ))}
              </div>
              <div className={styles.details + " mt-10"}>
                <FormattedDate
                  date={new Date("2022-10-10T17:33:32.877Z")}
                  className="text_color_inactive  text_type_main-small"
                />
                <p className="text text_type_digits-default mr-2">{price}</p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          </div>
        ) : null}
      </>
    </>
  );
};
