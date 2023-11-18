import styles from "./app.module.css";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngredients } from "../../services/actions/ingredients";
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
import Page404 from "../../pages/Page404/Page404";
import Feed from "../../pages/feed/feed";
import IngridientPage from "../../pages/ingridient-page/ingridient-page";
import OrderPage from "../../pages/orderPage/orderPage";
import { ProtectedRouteElement } from "../ProtectedRoute/protected-route";
import { shallowEqual } from "react-redux";
import { useSelector, useDispatch } from "../../services/types/hooks";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const { orders, userOrders } = useSelector(
    (store) => ({
      userOrders: store.ordersUserReducer.orders,
      orders: store.ordersReducer.orders,
    }),
    shallowEqual,
  );

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
                element={<IngridientPage />}
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
            >
              <Route
                path="/profile/orders/:orderId"
                element={
                  <ProtectedRouteElement
                    element={<OrderPage orders={userOrders} />}
                  />
                }
              />
            </Route>
            <Route
              path="/feed"
              element={<ProtectedRouteElement element={<Feed />} />}
            >
              <Route
                path="/feed/:orderId"
                element={
                  <ProtectedRouteElement
                    element={<OrderPage orders={orders} />}
                  />
                }
              />
            </Route>
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Router>
      </pre>
    </DndProvider>
  );
}

export default App;
