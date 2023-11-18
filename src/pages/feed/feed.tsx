import styles from "./feed.module.css";
import { CartList } from "../../components/CardList/card-list";
import { shallowEqual } from "react-redux";
import { useSelector, useDispatch } from "../../services/types/hooks";
import { Outlet } from "react-router-dom";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../../services/actions/orders";
import { useEffect } from "react";

export default function Feed() {
  const dispatch = useDispatch();
  const { orders, total, totalToday } = useSelector(
    (store) => ({
      orders: store.ordersReducer.orders,
      total: store.ordersReducer.total,
      totalToday: store.ordersReducer.totalToday,
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    return (): any => dispatch({ type: WS_CONNECTION_CLOSED });
  }, []);

  const done = orders?.filter((order) => order.status === "done");
  const pending = orders?.filter((order) => order.status === "pending");

  return (
    <>
      <div className={styles.container + " pl-5 pr-5"}>
        <h2 className={styles.title + " text text_type_main-large mt-10 mb-5"}>
          Лента заказов
        </h2>
        <div className={styles.feed}>
          <CartList orders={orders || []} path="/feed/" />
        </div>
        <div className={styles.numbers + " ml-10"}>
          <div className={styles.state}>
            <div>
              <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
              {done ? (
                <>
                  <p
                    className={
                      styles.digit_small + " text text_type_digits-small mt-2"
                    }
                  >
                    {done[0]?.number}
                  </p>
                  <p
                    className={
                      styles.digit_small + " text text_type_digits-small mt-2"
                    }
                  >
                    {done[1]?.number}
                  </p>
                  <p
                    className={
                      styles.digit_small + " text text_type_digits-small mt-2"
                    }
                  >
                    {done[2]?.number}
                  </p>
                </>
              ) : null}
            </div>
            {pending ? (
              <div>
                <h3 className="text text_type_main-medium mb-6">В работе:</h3>
                <p className="text text_type_digits-small mt-2">
                  {pending[0]?.number}
                </p>
                <p className="text text_type_digits-small mt-2">
                  {pending[1]?.number}
                </p>
                <p className="text text_type_digits-small mt-2">
                  {pending[2]?.number}
                </p>
              </div>
            ) : null}
          </div>
          <div>
            <h3 className="text text_type_main-medium">
              Выполнено за все время:
            </h3>
            <p className={styles.digit + " text text_type_digits-large"}>
              {total}
            </p>
          </div>
          <div>
            <h3 className="text text_type_main-medium">
              Выполнено за сегодня:
            </h3>
            <p className={styles.digit + " text text_type_digits-large"}>
              {totalToday}
            </p>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}
