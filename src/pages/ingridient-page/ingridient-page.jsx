import styles from "./ingridient-page.module.css";
import IngredientDetails from "../../components/IngredientsDetails/ingredients-details";
import { useLocation, useNavigate } from "react-router-dom";
import { CLOSE_INFO_POPUP } from "../../services/actions/infoPopup";
import { Modal } from "../../components/Modal/modal";
import { useDispatch } from "react-redux";

export default function IngridientPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const popup = location.state?.popup;

  return (
    <>
      {popup ? (
        <Modal
          title="Детали ингредиента"
          visible={true}
          setVisible={() => {
            dispatch({ type: CLOSE_INFO_POPUP });
            navigate("/");
          }}
        >
          <IngredientDetails />
        </Modal>
      ) : (
        <div className={styles.page}>
          <div className={styles.title}>
            <h2 className="text text_type_main-large">Детали ингредиента</h2>
          </div>
          <IngredientDetails />
        </div>
      )}
    </>
  );
}
