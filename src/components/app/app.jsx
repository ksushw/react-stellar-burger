import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngredients } from "../../services/actions/ingredients";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, []);
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div className={styles.app} id="app">
                <AppHeader />
                <pre className={styles.container}>
                  <main className={styles.main}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                  </main>
                </pre>
              </div>
            }
          />
        </Routes>
      </Router>
    </DndProvider>
  );
}

export default App;
