import styles from "./history.module.css";
import { Link } from "react-router-dom";
import CartList from "../../components/CardList/card-list";
import { useSelector, shallowEqual } from "react-redux";
import { Outlet } from "react-router-dom";
import {
  WS_CONNECTION_USER_START,
  WS_CONNECTION_USER_CLOSED,
} from "../../services/actions/userOrders";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function History() {
  const orders = useSelector(
    (store) => store.ordersUserReducer.orders,
    shallowEqual,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: WS_CONNECTION_USER_START });
    return () => dispatch({ type: WS_CONNECTION_USER_CLOSED });
  }, []);

  return (
    <>
      <div className={styles.container + " pl-5 pr-5"}>
        <div className={styles.navigation}>
          <Link
            to="/profile"
            className={
              styles.link +
              " text text_type_main-medium text_color_inactive pt-4 pb-4"
            }
          >
            Профиль
          </Link>
          <Link
            to=""
            className={
              styles.link +
              " text text_type_main-medium pt-4 pb-4 " +
              styles.whiteText
            }
          >
            История заказов
          </Link>
          <Link
            to="/login"
            className={
              styles.link +
              " text text_type_main-medium text_color_inactive pt-4 pb-4"
            }
          >
            Выход
          </Link>
          <p
            className={
              styles.text +
              " text text_type_main-default text_color_inactive mt-20"
            }
          >
            В этом разделе вы можете просмотреть свою историю заказов
          </p>
        </div>
        <div className={styles.feed}>
          <CartList orders={orders} path="/profile/orders/" />
        </div>
      </div>
      <Outlet />
    </>
  );
}
