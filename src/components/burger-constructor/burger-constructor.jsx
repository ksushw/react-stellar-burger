import { createPortal } from "react-dom";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import DradAndDropWrapper from "../dradAndDropWrapper/dradAndDropWrapper";
import OrderDetails from "../order-details/order-details";
import { useContext, useState } from "react";
import {
  TotalPriceContext,
  OrderContext,
  MakedOrderContext,
} from "../../services/appContext";

import { sendOrder } from "../../utils/api";

export default function BurgerConstructor({}) {
  const { price, setPrice } = useContext(TotalPriceContext);
  const { order, setOrder } = useContext(OrderContext);

  const { setOrderInfo } = useContext(MakedOrderContext);
  const [visibleOrderDetails, setVisibleOrderDetails] = useState(false);

  const makeOrder = async () => {
    const orderIds = [order.bun._id];
    order.filling.map((ingridient) => orderIds.push(ingridient._id));
    const orderInfo = await sendOrder(orderIds);
    setOrderInfo({ ...orderInfo });
    setVisibleOrderDetails(true);
    setOrder({
      ...order,
      filling: [],
    });
  };

  function removeIngridient(ingredient, index) {
    const newFilling = Object.assign([], order.filling);
    newFilling.splice(index, 1);
    setOrder({
      ...order,
      filling: newFilling,
    });
    setPrice({ type: "minus", price: ingredient.price });
  }

  return (
    <section
      className={styles.container + " pt-4 pb-4 pl-5 pr-5 ml-5 mr-5 mt-20"}
    >
      <div className={styles.order}>
        {order.bun && (
          <div className={styles.bun}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${order.bun.name} (верх)`}
              price={order.bun.price}
              thumbnail={order.bun.image}
              extraClass={styles.element}
            />
          </div>
        )}
        {order.filling && (
          <ul className={styles.fill + " custom-scroll"}>
            {order.filling.map((ingredient, index) => {
              return (
                <li key={index}>
                  <DradAndDropWrapper
                    id={index}
                    index={index}
                    className={styles.ingredient}
                  >
                    <ConstructorElement
                      type={ingredient.type}
                      isLocked={ingredient.type === "bun" ? true : false}
                      text={ingredient.name}
                      price={ingredient.price}
                      thumbnail={ingredient.image}
                      extraClass={styles.element}
                      handleClose={() => removeIngridient(ingredient, index)}
                    />
                  </DradAndDropWrapper>
                </li>
              );
            })}
          </ul>
        )}

        {order.bun && (
          <div className={styles.bun}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${order.bun.name} (низ)`}
              price={order.bun.price}
              thumbnail={order.bun.image}
              extraClass={styles.element}
            />
          </div>
        )}
      </div>
      <div className={styles.price + " mr-10"}>
        <p className="text text_type_digits-medium mr-2">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <div className="mt-5">
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={makeOrder}
        >
          Оформить заказ
        </Button>
      </div>

      {createPortal(
        <OrderDetails
          visible={visibleOrderDetails}
          setVisible={setVisibleOrderDetails}
        />,
        document.body,
      )}
    </section>
  );
}
