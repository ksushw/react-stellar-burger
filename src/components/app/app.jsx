import styles from "./app.module.css";

import { useReducer, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngredientDetails from '../ingredients-details/ingredients-details';
import OrderDetails from '../order-details/order-details';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TotalPriceContext, DataContext, OrderContext } from '../../services/appContext'

function App() {

  const [api, setApi] = useState({
    data: {},
    loading: true
  })

  const [order, setOrder] = useState({
    bun: {},
    filling: []
  });

  const [price, setPrice] = useReducer(countPrise, 0);

  const [visibleIngDetails, setVisibleIngDetails] = useState(null);
  const [visibleOrderDetails, setVisibleOrderDetails] = useState(false);

  const urlDomain = `https://norma.nomoreparties.space/api/ingredients`;

  // Запрос апи
  useEffect(() => {
    const getProductData = async () => {
      setApi({ ...api, loading: true });
      await fetch(urlDomain)
        .then(res => {
          if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
          }
          return res.json()
        })
        .then(data => {
          setApi({ ...data, loading: false })
          setDefaultBun(data.data)
        })
        .catch((e) => console.error(e));
    }
    getProductData();
  }, [urlDomain])

  // Булка по умолчанию
  const setDefaultBun = (data) => {
    const bun = data.find((elem) => {
      return elem.type === 'bun'
    })
    setOrder({
      ...order,
      bun: bun,
    });
    setPrice({ type: 'plus', price: bun.price })
  }

  // Добовляет в стоимость цену нового ингридиента
  function countPrise(price, action) {
    switch (action.type) {
      case 'plus':
        return price + action.price;
      case 'minus':
        return price - action.price
    }
  }

  const { loading, success } = api;
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.app} id="app">
        <AppHeader />

        <DataContext.Provider value={{ api, setApi }}>
          <OrderContext.Provider value={{ order, setOrder }}>
            <TotalPriceContext.Provider value={{ price, setPrice }}>
              <pre className={styles.container}>
                <main className={styles.main}>
                  {!loading && success && (<BurgerIngredients openPopup={setVisibleIngDetails} />)}
                  {!loading && success && (<BurgerConstructor openPopup={setVisibleOrderDetails} />)}
                </main>
              </pre>
            </TotalPriceContext.Provider>
          </OrderContext.Provider>
        </DataContext.Provider>
        {!loading && success && createPortal(
          <>
            <IngredientDetails ingridient={visibleIngDetails} setVisible={setVisibleIngDetails} />
            <OrderDetails visible={visibleOrderDetails} setVisible={setVisibleOrderDetails} />
          </>,
          document.body
        )}
      </div>
    </DndProvider>

  );
}

export default App;




