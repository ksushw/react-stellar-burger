import { createPortal } from "react-dom";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import DragAndDropWrapper from "../DragAndDropWrapper/DragAndDropWrapper";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import update from "immutability-helper";

import { useState, useCallback, useEffect } from "react";

import { sendOrder } from "../../services/actions/order";

import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  REMOVE_FILLING,
  DELETE_FILLING,
  ADD_FILLING,
  CHANGE_BUN,
  EDIT_ORDER_DND,
} from "../../services/actions/constructor";
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";
export default function BurgerConstructor() {
  const [visibleOrderDetails, setVisibleOrderDetails] = useState(false);

  const { items, price, filling, bun, isAuth } = useSelector(
    (store) => ({
      price: store.constructorReducer.price,
      bun: store.constructorReducer.bun,
      filling: store.constructorReducer.fillings,
      items: store.ingredientReducer.items,
      isAuth: store.regisrationReducer.isAuth,
    }),
    shallowEqual,
  );

  const [order, setOrder] = useState([]);

  useEffect(() => {
    setOrder(filling);
  }, [filling]);

  const [, dropTarget] = useDrop({
    accept: "ingredientItem",
    drop(item) {
      handleDrop(item);
    },
  });

  const handleDrop = (item) => {
    const newIngredient = items.filter((element) => element._id == item.id)[0];
    if (newIngredient.type === "bun") {
      dispatch({ type: CHANGE_BUN, bun: newIngredient });
    } else {
      dispatch({ type: ADD_FILLING, item: newIngredient });
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const makeOrder = async () => {
    if (isAuth) {
      const orderIds = [bun._id];
      filling.map((ingredient) => orderIds.push(ingredient._id));
      dispatch(sendOrder(orderIds));
      setVisibleOrderDetails(true);
      dispatch({ type: REMOVE_FILLING });
    } else {
      navigate("/login");
    }
  };

  function removeIngredient(ingredient, index) {
    dispatch({ type: DELETE_FILLING, index: index, price: ingredient.price });
  }
  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      setOrder((prevCards) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex]],
          ],
        }),
      );
      dispatch({ type: EDIT_ORDER_DND, order: order });
    },
    [order],
  );

  return (
    <section
      className={styles.container + " pt-4 pb-4 pl-5 pr-5 ml-5 mr-5 mt-20"}
      ref={dropTarget}
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
        {order && (
          <ul className={styles.fill + " custom-scroll"}>
            {order.map((ingredient, index) => {
              return (
                <li key={index}>
                  <DragAndDropWrapper
                    id={ingredient._id}
                    index={index}
                    className={styles.ingredient}
                    moveCard={moveCard}
                  >
                    <ConstructorElement
                      type={ingredient.type}
                      isLocked={ingredient.type === "bun" ? true : false}
                      text={ingredient.name}
                      price={ingredient.price}
                      thumbnail={ingredient.image}
                      extraClass={styles.element}
                      handleClose={() => removeIngredient(ingredient, index)}
                    />
                  </DragAndDropWrapper>
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
