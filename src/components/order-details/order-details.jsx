import styles from "./order-details.module.css";
import done from "../../images/done.png";
import { useContext } from "react";
import { MakedOrderContext } from "../../services/appContext";

export default function OrderDetails() {
  const { orderInfo } = useContext(MakedOrderContext);

  return (
    <>
      {orderInfo.success && (
        <>
          {orderInfo.order.number && (
            <p className={styles.number + " text text_type_digits-large mb-8"}>
              {orderInfo.order.number}
            </p>
          )}
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
    </>
  );
}
