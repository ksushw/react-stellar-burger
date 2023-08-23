import styles from "./app.module.css";

import { useReducer, useState, useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  TotalPriceContext,
  DataContext,
  OrderContext,
  MakedOrderContext,
} from "../../services/appContext";

import { getProductData as getApi } from "../../utils/api";

function countPrise(price, action) {
  switch (action.type) {
    case "plus":
      return price + action.price;
    case "minus":
      return price - action.price;
  }
}

function App() {
  const [data, setData] = useState({
    ingredients: {},
    loading: true,
  });

  const [order, setOrder] = useState({
    bun: {},
    filling: [],
  });

  const [orderInfo, setOrderInfo] = useState({});
  const [price, setPrice] = useReducer(countPrise, 0);

  // Запрос апи
  useEffect(() => {
    setData({ ...data, loading: true });
    const getProductData = async () => {
      const api = await getApi();
      setData({
        ingredients: api.data,
        loading: false,
        success: api.success,
      });
      setDefaultBun(api.data);
    };

    getProductData();
  }, []);

  // Булка по умолчанию
  const setDefaultBun = (data) => {
    const bun = data.find((elem) => {
      return elem.type === "bun";
    });
    setOrder({
      ...order,
      bun: bun,
    });
    setPrice({ type: "plus", price: bun.price });
  };

  const { loading, success } = data;
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.app} id="app">
        <AppHeader />
        <MakedOrderContext.Provider value={{ orderInfo, setOrderInfo }}>
          <DataContext.Provider value={{ data, setData }}>
            <OrderContext.Provider value={{ order, setOrder }}>
              <TotalPriceContext.Provider value={{ price, setPrice }}>
                <pre className={styles.container}>
                  <main className={styles.main}>
                    {!loading && success && <BurgerIngredients />}
                    {!loading && success && <BurgerConstructor />}
                  </main>
                </pre>
              </TotalPriceContext.Provider>
            </OrderContext.Provider>
          </DataContext.Provider>
        </MakedOrderContext.Provider>
      </div>
    </DndProvider>
  );
}

export default App;
