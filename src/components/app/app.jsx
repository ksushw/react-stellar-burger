import styles from "./app.module.css";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngredients } from "../../services/actions/ingredients";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AppHeader from "../AppHeader/app-header";
import BurgerIngredients from "../BurgerIngredients/burger-ingredients";
import BurgerConstructor from "../BurgerConstructor/burger-constructor";
import Login from "../../pages/login/login";
import Registration from "../../pages/registration/registration";
import FogotPassword from "../../pages/fogot-password/fogot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import History from "../../pages/history/history";
import Profile from "../../pages/profile/profile";
import Feed from "../../pages/feed/feed";
import Modal from "../Modal/modal";
import IngridientPage from "../../pages/ingridient-page/ingridient-page";
import IngredientDetails from "../IngredientsDetails/ingredients-details";
import { ProtectedRouteElement } from "../ProtectedRoute/protected-route";
import { CLOSE_INFO_POPUP } from "../../services/actions/infoPopup";
import IngredientDetailsPage from "../../pages/ingridientPage/ingridiet-page";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const selectedOrderPopupIng = sessionStorage.getItem("modal");
  console.log(selectedOrderPopupIng);
  // useSelector(
  //   (store) => store.infoPopupReducer.selectedOrderPopupIng
  // );

  return (
    <DndProvider backend={HTML5Backend}>
      <pre className={styles.container}>
        <Router>
          <AppHeader />

          <Routes>
            <Route
              path="/"
              element={
                <div className={styles.app} id="app">
                  <pre className={styles.container}>
                    <main className={styles.main}>
                      <BurgerIngredients></BurgerIngredients>
                      <BurgerConstructor />
                    </main>
                  </pre>
                </div>
              }
            >
              <Route
                path="ingridients/:ingridientId"
                element={
                  selectedOrderPopupIng ? (
                    <Modal
                      title="Детали ингредиента"
                      visible={true}
                      setVisible={() => {
                        dispatch({ type: CLOSE_INFO_POPUP });
                        sessionStorage.removeItem("modal");
                      }}
                    >
                      <IngredientDetails />
                    </Modal>
                  ) : (
                    <IngridientPage />
                  )
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
