import styles from "./ingredients-details.module.css";
import Modal from "../modal/modal";

export default function IngredientDetails({ ingridient, setVisible }) {
  const visibleBoolean = Boolean(ingridient);

  return (
    <>
      <Modal
        title="Детали ингредиента"
        visible={visibleBoolean}
        setVisible={setVisible}
      >
        {ingridient && (
          <>
            <img
              src={ingridient.image_large}
              alt={ingridient.name}
              className="mb-4"
            />
            <p className={styles.title + "text text_type_main-medium mb-8"}>
              {ingridient.name}
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
                  {ingridient.calories}
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
                  {ingridient.proteins}
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
                  {ingridient.fat}
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
                  {ingridient.carbohydrates}
                </p>
              </div>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
