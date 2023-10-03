import styles from "./app.module.css";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngredients } from "../../services/actions/ingredients";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Login from "../../pages/login/login";
import Registration from "../../pages/registration/registration";
import FogotPassword from "../../pages/fogot-password/fogot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import History from "../../pages/history/history";
import Profile from "../../pages/profile/profile";
import Feed from "../../pages/feed/feed";
import Modal from "../../components/modal/modal";
import IngredientDetails from "../ingredients-details/ingredients-details";
import { ProtectedRouteElement } from "../protected-route/protected-route";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <pre className={styles.container}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <div className={styles.app} id="app">
                  <AppHeader />
                  <pre className={styles.container}>
                    <main className={styles.main}>
                      <BurgerIngredients path="ingridients"></BurgerIngredients>
                      <BurgerConstructor />
                    </main>
                  </pre>
                </div>
              }
            >
              <Route
                path=":ingridientId"
                element={
                  <Modal title="Детали ингредиента" visible={true}>
                    <IngredientDetails />
                  </Modal>
                }
              />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/login/registration" element={<Registration />} />
            <Route path="/login/fogote-password" element={<FogotPassword />} />
            <Route path="/login/reset-password" element={<ResetPassword />} />
            <Route
              path="/profile"
              element={<ProtectedRouteElement element={<Profile />} />}
            />
            <Route
              path="/profile/orders"
              element={<ProtectedRouteElement element={<History />} />}
            />
            <Route
              path="/feed"
              element={<ProtectedRouteElement element={<Feed />} />}
            />
          </Routes>
        </Router>
      </pre>
    </DndProvider>
  );
}

export default App;
