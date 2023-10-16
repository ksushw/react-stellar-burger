import styles from "./card-list.module.css";
import Cart from "../Cart/cart";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../../services/actions/orders";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function CartList({ orders, path, wsUrl }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, url: wsUrl });
    return () => dispatch({ type: WS_CONNECTION_CLOSED });
  }, []);
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
