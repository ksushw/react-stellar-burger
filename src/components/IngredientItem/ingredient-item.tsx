import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-item.module.css";
import { useDrag } from "react-dnd";
import { IIngredient } from "../../utils/types";
import { Dispatch, FC } from "react";

interface IIngredientItem {
  ingredient: IIngredient;
  count: number | null;
  onClick: (ingredient: IIngredient) => void;
}

export const IngredientItem: FC<IIngredientItem> = ({
  ingredient,
  count,
  onClick,
}) => {
  const id = ingredient._id;

  const [, useRef] = useDrag({
    type: "ingredientItem",
    item: { id },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <li
      onClick={() => onClick(ingredient)}
      className={styles.ingredient}
      draggable={true}
      ref={useRef}
    >
      {count && <Counter count={count} size="default" extraClass="m-1" />}
      <img
        className="ingredient__image"
        src={ingredient.image}
        alt={ingredient.name}
        draggable={false}
      />
      <div className={styles.price}>
        <p className="text text_type_digits-default mr-2">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={styles.name + " text text_type_main-small"}>
        {ingredient.name}
      </p>
    </li>
  );
};
