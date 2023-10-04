import styles from "./ingredients-details.module.css";
import IngredientDetails from "../../components/ingredients-details/ingredients-details";
export default function IngredientDetailsPage({ children }) {
  return <>{item && <div>{children}</div>}</>;
}
