import { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientItem from "../ingredient-item/ingredient-item";
import styles from "./burger-ingredients.module.css";
import { useContext } from "react";
import {
  DataContext,
  OrderContext,
  TotalPriceContext,
} from "../../services/appContext";

export default function BurgerIngredients({ openPopup }) {
  //Данные с апи
  const { api } = useContext(DataContext);
  const data = api.data;

  //get order context
  const { order, setOrder } = useContext(OrderContext);

  //Change order function
  const { setPrice } = useContext(TotalPriceContext);

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
          {data.map((ingredient) => {
            return (
              ingredient.type === "bun" && (
                <IngredientItem
                  ingredient={ingredient}
                  key={ingredient._id}
                  count={ingredient.name === order.bun.name && 1}
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
          {data.map((ingredient) => {
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
          {data.map((ingredient) => {
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
      </div>
    </section>
  );
}
