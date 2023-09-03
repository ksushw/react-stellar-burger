import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-item.module.css";
import { ingredientPropType } from "../../utils/prop-types";
import { useDrag } from "react-dnd";

export default function IngredientItem({ ingredient, count, onClick }) {
  const id = ingredient._id;

  const [, useRef] = useDrag({
    type: "ingridientItem",
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
}

IngredientItem.propTypes = {
  ingredient: ingredientPropType,
};
