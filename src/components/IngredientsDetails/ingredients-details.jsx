import styles from "./ingredients-details.module.css";
import { useSelector, shallowEqual } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
export default function IngredientDetails() {
  const { ingredients } = useSelector(
    (store) => ({
      ingredient: store.infoPopupReducer.selectedOrderPopupIng,
      ingredients: store.ingredientReducer.items,
    }),
    shallowEqual,
  );
  const { ingridientId } = useParams();
  const [item, setItem] = useState({});

  useEffect(() => {
    const item = ingredients.find((item) => {
      return item._id === ingridientId;
    });
    setItem(item);
  });

  return (
    <>
      {item && (
        <>
          <img src={item.image_large} alt={item.name} className="mb-4" />
          <p className={styles.title + "text text_type_main-medium mb-8"}>
            {item.name}
          </p>
          <div className={styles.nutrients}>
            <div>
              <p className="text text_type_main-default text_color_inactive mb-2">
                Каллории, ккал
              </p>
              <p
                className={
                  styles.nutrient +
                  " text text_type_digits-default text_color_inactive"
                }
              >
                {item.calories}
              </p>
            </div>
            <div>
              <p className="text text_type_main-default text_color_inactive mb-2">
                Белки, г
              </p>
              <p
                className={
                  styles.nutrient +
                  " text text_type_digits-default text_color_inactive"
                }
              >
                {item.proteins}
              </p>
            </div>
            <div>
              <p className="text text_type_main-default text_color_inactive mb-2">
                Жиры, г
              </p>
              <p
                className={
                  styles.nutrient +
                  " text text_type_digits-default text_color_inactive"
                }
              >
                {item.fat}
              </p>
            </div>
            <div>
              <p className="text text_type_main-default text_color_inactive mb-2">
                Углеводы, г
              </p>
              <p
                className={
                  styles.nutrient +
                  " text text_type_digits-default text_color_inactive"
                }
              >
                {item.carbohydrates}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
