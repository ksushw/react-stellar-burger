import { createPortal } from "react-dom";
import { useState, useContext } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../ingredients-details/ingredients-details";
import IngredientItem from "../ingredient-item/ingredient-item";
import {
  DataContext,
  OrderContext,
  TotalPriceContext,
} from "../../services/appContext";
import Modal from "../modal/modal";

export default function BurgerIngredients() {
  //Данные с апи
  const { data } = useContext(DataContext);
  const ingredients = data.ingredients;

  //get order context
  const { order, setOrder } = useContext(OrderContext);

  //Change order function
  const { setPrice } = useContext(TotalPriceContext);

  const [visibleIngDetails, setVisibleIngDetails] = useState(null);

  // Добавление нового элемента в стейт
  function changeOrder(newingredient) {
    if (newingredient.type === "bun") {
      setPrice({ type: "plus", price: newingredient.price - order.bun.price });
      setOrder({ ...order, bun: newingredient });
    } else {
      setPrice({ type: "plus", price: newingredient.price });
      let newOrder = [...order.filling];
      newOrder.push(newingredient);
      setOrder({
        ...order,
        filling: newOrder,
      });
    }
  }

  // Позиция таба
  const [position, setPosition] = useState("bun");

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
    if (order.filling) {
      const amount = {};
      order.filling.map((ingredient) =>
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
        <p className="text text_type_main-medium pt-10 pb-6" id="buns">
          Булки
        </p>
        <ul className={styles.division}>
          {ingredients.map((ingredient) => {
            return (
              ingredient.type === "bun" && (
                <IngredientItem
                  ingredient={ingredient}
                  key={ingredient._id}
                  count={ingredient.name === order.bun.name && 1}
                  onClick={changeOrder}
                  onContextMenu={setVisibleIngDetails}
                />
              )
            );
          })}
        </ul>

        <p className="text text_type_main-medium  pt-10 pb-6" id="sauce">
          Соусы
        </p>
        <ul className={styles.division}>
          {ingredients.map((ingredient) => {
            return (
              ingredient.type === "sauce" && (
                <IngredientItem
                  ingredient={ingredient}
                  key={ingredient._id}
                  count={counter[ingredient.name]}
                  onClick={changeOrder}
                  onContextMenu={setVisibleIngDetails}
                />
              )
            );
          })}
        </ul>

        <p className="text text_type_main-medium pt-10 pb-6" id="main">
          Начинки
        </p>
        <ul className={styles.division}>
          {ingredients.map((ingredient) => {
            return (
              ingredient.type === "main" && (
                <IngredientItem
                  ingredient={ingredient}
                  key={ingredient._id}
                  count={counter[ingredient.name]}
                  onClick={changeOrder}
                  onContextMenu={setVisibleIngDetails}
                />
              )
            );
          })}
        </ul>
      </div>
      {createPortal(
        <Modal
          title="Детали ингредиента"
          visible={visibleIngDetails}
          setVisible={setVisibleIngDetails}
        >
          <IngredientDetails
            ingridient={visibleIngDetails}
            setVisible={setVisibleIngDetails}
          />
        </Modal>,
        document.body,
      )}
    </section>
  );
}
