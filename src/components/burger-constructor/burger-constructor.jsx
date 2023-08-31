import { createPortal } from "react-dom";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import DradAndDropWrapper from "../dradAndDropWrapper/dradAndDropWrapper";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";

import { useState } from "react";

import { sendOrder } from "../../utils/api";

import { useSelector, useDispatch } from "react-redux";
import { REMOVE_FILLING, DELETE_FILLING } from "../../services/actions/action";
export default function BurgerConstructor() {
  const [visibleOrderDetails, setVisibleOrderDetails] = useState(false);

  const { price, filling, bun } = useSelector((store) => ({
    price: store.ingridientReducer.price,
    bun: store.ingridientReducer.bun,
    filling: store.ingridientReducer.fillings,
    items: store.ingridientReducer.items,
    itemsRequest: store.ingridientReducer.itemsRequest,
    itemsFailed: store.ingridientReducer.itemsFailed,
  }));

  const dispatch = useDispatch();

  const makeOrder = async () => {
    const orderIds = [bun._id];
    filling.map((ingridient) => orderIds.push(ingridient._id));
    dispatch(sendOrder(orderIds));
    setVisibleOrderDetails(true);
    dispatch({ type: REMOVE_FILLING });
  };

  function removeIngridient(ingredient, index) {
    dispatch({ type: DELETE_FILLING, index: index, price: ingredient.price });
  }

  return (
    <section
      className={styles.container + " pt-4 pb-4 pl-5 pr-5 ml-5 mr-5 mt-20"}
    >
      <div className={styles.order}>
        {bun && (
          <div className={styles.bun}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
              extraClass={styles.element}
            />
          </div>
        )}
        {filling && (
          <ul className={styles.fill + " custom-scroll"}>
            {filling.map((ingredient, index) => {
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

        {bun && (
          <div className={styles.bun}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
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
        <Modal
          visible={visibleOrderDetails}
          setVisible={setVisibleOrderDetails}
        >
          <OrderDetails />
        </Modal>,
        document.body,
      )}
    </section>
  );
}
