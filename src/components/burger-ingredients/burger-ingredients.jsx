import { createPortal } from "react-dom";
import { useState } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../ingredients-details/ingredients-details";
import IngredientItem from "../ingredient-item/ingredient-item";
import Modal from "../modal/modal";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { OPEN_INFO_POPUP } from "../../services/actions/action";
import { useEffect } from "react";
import { getIngridients } from "../../utils/api";

export default function BurgerIngredients() {
  const [visibleIngDetails, setVisibleIngDetails] = useState(false);
  const [position, setPosition] = useState("bun");
  const [buns, setBuns] = useState([]);
  const [sauses, setSauses] = useState([]);
  const [main, setMain] = useState([]);

  useEffect(() => {
    dispatch(getIngridients());
  }, []);

  const { items, itemsRequest, itemsFailed, filling, bun } = useSelector(
    (store) => ({
      bun: store.ingridientReducer.bun,
      filling: store.ingridientReducer.fillings,
      items: store.ingridientReducer.items,
      itemsRequest: store.ingridientReducer.itemsRequest,
      itemsFailed: store.ingridientReducer.itemsFailed,
    }),
    shallowEqual,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setBuns(items.filter((item) => item.type === "bun"));
    setMain(items.filter((item) => item.type === "main"));
    setSauses(items.filter((item) => item.type === "sauce"));
  }, [items]);
  function openPopup(ingredient) {
    dispatch({ type: OPEN_INFO_POPUP, ingredient: ingredient });
    setVisibleIngDetails(true);
  }

  console.log(buns);

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
              {buns.map((ingredient) => {
                return (
                  <IngredientItem
                    ingredient={ingredient}
                    key={ingredient._id}
                    count={ingredient.name === bun.name && 1}
                    onClick={openPopup}
                  />
                );
              })}
            </ul>

            <p className="text text_type_main-medium  pt-10 pb-6" id="sauce">
              Соусы
            </p>
            <ul className={styles.division}>
              {sauses.map((ingredient) => {
                return (
                  <IngredientItem
                    ingredient={ingredient}
                    key={ingredient._id}
                    count={counter[ingredient.name]}
                    onClick={openPopup}
                  />
                );
              })}
            </ul>

            <p className="text text_type_main-medium pt-10 pb-6" id="main">
              Начинки
            </p>
            <ul className={styles.division}>
              {main.map((ingredient) => {
                return (
                  <IngredientItem
                    ingredient={ingredient}
                    key={ingredient._id}
                    count={counter[ingredient.name]}
                    onClick={openPopup}
                  />
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
