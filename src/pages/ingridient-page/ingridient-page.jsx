import styles from "./ingridient-page.module.css";
import IngredientDetails from "../../components/IngredientsDetails/ingredients-details";

export default function IngridientPage() {
  return (
    <>
      <div className={styles.page}>
        <div className={styles.title}>
          <h2 className="text text_type_main-large">Детали ингредиента</h2>
        </div>
        <IngredientDetails />
      </div>
    </>
  );
}
