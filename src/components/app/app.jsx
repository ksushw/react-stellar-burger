import styles from "./app.module.css";

import { useReducer, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngridientDetails from '../ingredients-details/ingredients-details';
import OrderDetails from '../order-details/order-details';

function App() {

  const [api, setApi] = useState({
    data: {},
    loading: true
  })
  const [order, setOrder] = useState([]);
  const [bun, setBun] = useState('');
  const [price, setPrice] = useReducer(countPrise, 0);

  const [visibleIngDatails, changeVisibleIngDatails] = useState(null);
  const [visibleOrderDetails, changeVisibleOrderDetails] = useState(false);

  const urlDomen = `https://norma.nomoreparties.space/api/ingredients`;

  // Запрос апи
  useEffect(() => {
    const getProductData = async () => {
      setApi({ ...api, loading: true });
      const res = await fetch(urlDomen)
        .then(res => res.json())
        .then(data => {
          setApi({ ...data, loading: false })
          const bun = defaultBun(data.data);
          setBun(bun);
          setPrice(bun.price)
        })
        .catch((e) => console.error(e));
    }
    getProductData();
  }, [])

  // Булка по умолчанию
  const defaultBun = (data) => {
    return data.find((elem) => {
      return elem.type === 'bun'
    })
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
    <div className={styles.app} id="app">
      <AppHeader />
      <pre className={styles.container}>
        <main className={styles.main}>
          {!loading && success && (<BurgerIngredients data={data} onClickingredient={changeOrder} order={order} bun={bun} openPopup={changeVisibleIngDatails} />)}
          {!loading && success && (<BurgerConstructor price={price} order={order} bun={bun} openPopup={changeVisibleOrderDetails} />)}
        </main>
      </pre>
      {!loading && success && createPortal(
        <>
          <IngridientDetails ingridient={visibleIngDatails} changeVisibleIngDatails={changeVisibleIngDatails} />
          <OrderDetails opened={visibleOrderDetails} changeVisibleIngDatails={changeVisibleOrderDetails} />
        </>,
        document.body
      )}
    </div>
  );
}

export default App;




