import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngridients } from "../../services/actions/ingridients";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngridients());
  }, []);
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.app} id="app">
        <AppHeader />
        <pre className={styles.container}>
          <main className={styles.main}>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
        </pre>
      </div>
    </DndProvider>
  );
}

export default App;
