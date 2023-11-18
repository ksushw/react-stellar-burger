import { useState } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import { IIngredient } from "../../utils/types";

import { IngredientItem } from "../IngredientItem/ingredient-item";
import { shallowEqual } from "react-redux";

import { useSelector, useDispatch } from "../../services/types/hooks";
import { OPEN_INFO_POPUP } from "../../services/actions/infoPopup";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function BurgerIngredients() {
  const [position, setPosition] = useState<"bun" | "main" | "sauce">("bun");
  const [buns, setBuns] = useState<ReadonlyArray<IIngredient>>([]);
  const [sauses, setSauses] = useState<ReadonlyArray<IIngredient>>([]);
  const [main, setMain] = useState<ReadonlyArray<IIngredient>>([]);

  const { items, itemsRequest, itemsFailed, filling, bun } = useSelector(
    (store) => ({
      bun: store.constructorReducer.bun,
      filling: store.constructorReducer.fillings,
      items: store.ingredientReducer.items,
      itemsRequest: store.ingredientReducer.itemsRequest,
      itemsFailed: store.ingredientReducer.itemsFailed,
    }),
    shallowEqual,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setBuns(items.filter((item) => item.type === "bun"));
    setMain(items.filter((item) => item.type === "main"));
    setSauses(items.filter((item) => item.type === "sauce"));
  }, [items, dispatch]);
  const navigate = useNavigate();
  function openPopup(ingredient: IIngredient) {
    dispatch({ type: OPEN_INFO_POPUP, ingredient: ingredient });
    navigate(`ingridients/${ingredient._id}`, { state: { popup: true } });
  }

  function changePosition() {
    const sause = document.getElementById(`#sauce`);
    const main = document.getElementById(`#main`);
    const scroll = document.getElementById("#container");
    if (sause && main && scroll) {
      const sausePosition = sause.offsetTop;
      const mainPosition = main.offsetTop;
      const scrollPosition = document.querySelector("#container")?.scrollTop;
      if (sausePosition && mainPosition && scrollPosition) {
        if (scrollPosition + 200 < sausePosition) {
          setPosition("bun");
        } else if (scrollPosition + 200 < mainPosition) {
          setPosition("sauce");
        } else {
          setPosition("main");
        }
      }
    }
  }

  function scroll(id: string): void {
    const divScrolledTo = document.querySelector(`#${id}`);
    if (divScrolledTo) {
      divScrolledTo.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  function count(): { [key: string]: number | null } {
    const amount: Record<string, number> = {};
    if (filling[0]) {
      filling.map((ingredient) =>
        amount[ingredient.name]
          ? (amount[ingredient.name] = amount[ingredient.name] + 1)
          : (amount[ingredient.name] = 1),
      );
    }
    return amount;
  }

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
                    count={ingredient.name === bun?.name ? 1 : null}
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
      <Outlet />
    </section>
  );
}
