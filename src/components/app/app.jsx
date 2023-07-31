import styles from "./app.module.css";

import { useReducer, useState, useEffect } from 'react';
import { data } from "../../utils/data";
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor'

function App() {

  const [api, setApi] = useState({
    data: {},
    loading: true
  })
  const [order, setOrder] = useState([]);
  const [bun, setBun] = useState('');
  const [price, setPrice] = useReducer(countPrise, 0);



  // Запрос апи
  useEffect(() => {
    const getProductData = async () => {
      setApi({ ...api, loading: true });
      const res = await fetch(`https://norma.nomoreparties.space/api/ingredients`);
      const data = await res.json();
      setApi({ ...data, loading: false });
      const bun = defaultBun(data.data);
      setBun(bun);
      setPrice(bun.price)
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
  function changeOrder(newingredient) {
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
    <div className={styles.app}>
      <AppHeader />
      <pre className={styles.container}>
        <main className={styles.main}>
          {!loading && success && (<BurgerIngredients data={data} onClickingredient={changeOrder} order={order} bun={bun} />)}
          {!loading && success && (<BurgerConstructor price={price} order={order} bun={bun} />)}
        </main>
      </pre>
    </div>
  );
}

export default App;




