import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { DragAndDropWrapper } from "../DragAndDropWrapper/DragAndDropWrapper";
import OrderDetails from "../OrderDetails/order-details";
import { Modal } from "../Modal/modal";
import update from "immutability-helper";
import { IIngredient } from "../../utils/types";

import { useState, useCallback, useEffect } from "react";

import { sendOrder } from "../../services/actions/order";

import { shallowEqual } from "react-redux";
import { useSelector, useDispatch } from "../../services/types/hooks";
import {
  REMOVE_ORDER,
  DELETE_FILLING,
  CHANGE_BUN,
  EDIT_ORDER_DND,
  addIngridient,
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

  const [order, setOrder] = useState<
    ReadonlyArray<IIngredient & { uniqueId: string }>
  >([]);

  useEffect(() => {
    setOrder(filling);
  }, [filling]);

  const [, dropTarget] = useDrop({
    accept: "ingredientItem",
    drop(item: { id: string }) {
      handleDrop(item);
    },
  });

  const handleDrop = (item: { id: string }) => {
    const newIngredient = items.filter((element) => element._id == item.id)[0];
    if (newIngredient.type === "bun") {
      dispatch({ type: CHANGE_BUN, item: newIngredient });
    } else {
      dispatch(addIngridient(newIngredient));
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const makeOrder = async () => {
    if (isAuth && bun?._id) {
      const orderIds = [bun?._id];
      filling.map((ingredient) => orderIds.push(ingredient._id));
      dispatch(sendOrder(orderIds));
      setVisibleOrderDetails(true);
      dispatch({ type: REMOVE_ORDER });
    } else {
      navigate("/login");
    }
  };

  function removeIngredient(ingredient: IIngredient, index: number) {
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
        {!bun && !order.length && (
          <p className={styles.tip + " text text_type_main-default mt-15"}>
            Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа
          </p>
        )}
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
                    id={ingredient.uniqueId}
                    index={index}
                    className={styles.ingredient}
                    moveCard={moveCard}
                  >
                    <ConstructorElement
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
      {bun && order[0] && (
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
      )}
      <Modal visible={visibleOrderDetails} setVisible={setVisibleOrderDetails}>
        <OrderDetails />
      </Modal>
    </section>
  );
}
