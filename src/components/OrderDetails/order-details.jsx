import styles from "./order-details.module.css";
import done from "../../images/done.png";
import { useSelector } from "../../services/types/hooks";
import Loader from "../Loader/Loader";
export default function OrderDetails() {
  const { order, orderRequest, orderFailed } = useSelector((store) => ({
    order: store.orderReducer.order,
    orderRequest: store.orderReducer.orderRequest,
    orderFailed: store.orderReducer.orderFailed,
  }));

  return (
    <>
      {!orderRequest && !orderFailed && (
        <>
          <p className={styles.number + " text text_type_digits-large mb-8"}>
            {order}
          </p>
          <p className="text text_type_main-medium">идентификатор заказа</p>
          <img src={done} alt="Галочка" className="mt-15 mb-15" />
          <p className="text text_type_main-small mb-2">
            Ваш заказ начали готовить
          </p>
          <p className="text text_type_main-small text_color_inactive mb-20">
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      )}
      {orderRequest && <Loader />}
    </>
  );
}
