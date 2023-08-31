import { createPortal } from "react-dom";
import { useState } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../ingredients-details/ingredients-details";
import IngredientItem from "../ingredient-item/ingredient-item";
import Modal from "../modal/modal";
import { useSelector, useDispatch } from "react-redux";
import {
  ADD_FILLING,
  CHANGE_BUN,
  OPEN_INFO_POPUP,
} from "../../services/actions/action";
import { useEffect } from "react";
import { getIngridients } from "../../utils/api";

export default function BurgerIngredients() {
  const [visibleIngDetails, setVisibleIngDetails] = useState(false);
  const [position, setPosition] = useState("bun");

  const { items, itemsRequest, itemsFailed, filling, bun } = useSelector(
    (store) => ({
      bun: store.ingridientReducer.bun,
      filling: store.ingridientReducer.fillings,
      items: store.ingridientReducer.items,
      itemsRequest: store.ingridientReducer.itemsRequest,
      itemsFailed: store.ingridientReducer.itemsFailed,
    }),
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngridients());
  }, []);

  function openPopup(ingredient) {
    dispatch({ type: OPEN_INFO_POPUP, ingredient: ingredient });
    setVisibleIngDetails(true);
  }
  // Добавление нового элемента в стейт
  function changeOrder(newingredient) {
    if (newingredient.type === "bun") {
      dispatch({ type: CHANGE_BUN, bun: newingredient });
    } else {
      dispatch({ type: ADD_FILLING, item: newingredient });
    }
  }

  //Определяет активный таб
  function changePosition() {
    const sausePosition = document.querySelector(`#sauce`).offsetTop;
    const mainPosition = document.querySelector(`#main`).offsetTop;
    const scrollPosition = document.querySelector("#container").scrollTop;

    if (scrollPosition + 200 < sausePosition) {
      setPosition("bun");
    } else if (scrollPosition + 200 < mainPosition) {
      setPosition("sauce");
    } else {
      setPosition("main");
    }
  }

  // Скролл до нужного блока
  function scroll(id) {
    document.querySelector(`#${id}`).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  // Количество ингридиентов определяет
  function count() {
    if (filling !== []) {
      const amount = {};
      filling.map((ingredient) =>
        amount[ingredient.name]
          ? (amount[ingredient.name] = amount[ingredient.name] + 1)
          : (amount[ingredient.name] = 1),
      );
      return amount;
    }
  }

  // Объект с числом ингридиентов в заказе
  const counter = count();

  return (
    <section className={styles.ingredients + " pt-10 mr-5 ml-5"}>
      <p className="text text_type_main-large mb-4">Соберите бургер</p>
      <nav className={styles.navigation}>
        <Tab
          value="one"
          onClick={() => scroll("buns")}
          active={position === "bun"}
        >
          Булки
        </Tab>
        <Tab
          value="two"
          onClick={() => scroll("sauce")}
          active={position === "sauce"}
        >
          Соусы
        </Tab>
        <Tab
          value="three"
          onClick={() => scroll("main")}
          active={position === "main"}
        >
          Начинки
        </Tab>
      </nav>
      <div
        className={styles.container + " custom-scroll"}
        id="container"
        onScroll={changePosition}
      >
        {!itemsRequest && !itemsFailed && (
          <>
            <p className="text text_type_main-medium pt-10 pb-6" id="buns">
              Булки
            </p>
            <ul className={styles.division}>
              {items.map((ingredient) => {
                return (
                  ingredient.type === "bun" && (
                    <IngredientItem
                      ingredient={ingredient}
                      key={ingredient._id}
                      count={ingredient.name === bun.name && 1}
                      onClick={changeOrder}
                      onContextMenu={openPopup}
                    />
                  )
                );
              })}
            </ul>

            <p className="text text_type_main-medium  pt-10 pb-6" id="sauce">
              Соусы
            </p>
            <ul className={styles.division}>
              {items.map((ingredient) => {
                return (
                  ingredient.type === "sauce" && (
                    <IngredientItem
                      ingredient={ingredient}
                      key={ingredient._id}
                      count={counter[ingredient.name]}
                      onClick={changeOrder}
                      onContextMenu={openPopup}
                    />
                  )
                );
              })}
            </ul>

            <p className="text text_type_main-medium pt-10 pb-6" id="main">
              Начинки
            </p>
            <ul className={styles.division}>
              {items.map((ingredient) => {
                return (
                  ingredient.type === "main" && (
                    <IngredientItem
                      ingredient={ingredient}
                      key={ingredient._id}
                      count={counter[ingredient.name]}
                      onClick={changeOrder}
                      onContextMenu={openPopup}
                    />
                  )
                );
              })}
            </ul>
          </>
        )}
      </div>
      {createPortal(
        <Modal
          title="Детали ингредиента"
          visible={visibleIngDetails}
          setVisible={setVisibleIngDetails}
        >
          <IngredientDetails />
        </Modal>,
        document.body,
      )}
    </section>
  );
}
