import styles from "./app.module.css";
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
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngredients } from "../../services/actions/ingredients";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useEffect, useState } from "react";
import { refreshToken as responseNewToken } from "../../services/actions/registration";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const refreshToken = useSelector(
    (store) => store.regisrationReducer.refreshToken,
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, []);
  // console.log(refreshToken);

  const takeNewToken = (refreshToken) => {
    if (refreshToken) {
      console.log(refreshToken);
      dispatch(responseNewToken(refreshToken));
    }
  };

  useEffect(() => {
    if (refreshToken) {
      takeNewToken();
    }
    const intervalId = setInterval(takeNewToken, 8000);
    sessionStorage.setItem("freshTokenIntervalId", intervalId, refreshToken);
  }, []);

  useEffect(() => {
    if (refreshToken) {
      const intervalId = setTimeout(() => takeNewToken(refreshToken), 110000);
      sessionStorage.setItem("freshTokenIntervalId", intervalId);
    }
  }, [refreshToken]);

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
                      <BurgerIngredients />
                      <BurgerConstructor />
                    </main>
                  </pre>
                </div>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/fogote-password" element={<FogotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/orders" element={<History />} />
            <Route path="/feed" element={<Feed />} />
          </Routes>
        </Router>
      </pre>
    </DndProvider>
  );
}

export default App;
