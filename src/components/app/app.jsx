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

function App() {

  const [api, setApi] = useState({
    data: {},
    loading: true
  })
  const [order, setOrder] = useState([]);
  const [bun, setBun] = useState('');
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
  }, [ urlDomain ])

  // Булка по умолчанию
  const setDefaultBun = (data) => {
    const bun = data.find((elem) => {
      return elem.type === 'bun'
    })
    setBun(bun);
    setPrice(bun.price)
  }

  // Добовляет в стоимость цену нового ингридиента
  function countPrise(price, added) {
    return price + added;
  }

  // Добавление нового элемента в стейт
  function changeOrder(newingredient, element) {
    if (newingredient.type === 'bun') {
      setPrice(newingredient.price - bun.price)
      setBun(newingredient)
    } else {
      setPrice(newingredient.price)
      setOrder([...order, newingredient])
    }
  }



  const { data, loading, success } = api;
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.app} id="app">
        <AppHeader />
        <pre className={styles.container}>
          <main className={styles.main}>
            {!loading && success && (<BurgerIngredients data={data} onClickingredient={changeOrder} order={order} bun={bun} openPopup={setVisibleIngDetails} />)}
            {!loading && success && (<BurgerConstructor price={price} order={order} bun={bun} openPopup={setVisibleOrderDetails} setOrder={setOrder} />)}
          </main>
        </pre>
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




