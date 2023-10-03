import styles from "./ingredients-details.module.css";
import { ingredientPropType } from "../../utils/prop-types";
import { useSelector } from "react-redux";
import { createPortal } from "react-dom";
export default function IngredientDetails() {
  const ingredient = useSelector(
    (store) => store.infoPopupReducer.selectedOrderPopupIng,
  );

  console.log(ingredient);
  return (
    <>
      {ingredient && (
        <>
          <img
            src={ingredient.image_large}
            alt={ingredient.name}
            className="mb-4"
          />
          <p className={styles.title + "text text_type_main-medium mb-8"}>
            {ingredient.name}
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
                {ingredient.calories}
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
                {ingredient.proteins}
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
                {ingredient.fat}
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
                {ingredient.carbohydrates}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

// IngredientDetails.propTypes = {
//   ingredient: ingredientPropType,
// };
