import styles from "./app.module.css";

import { useReducer, useState } from 'react';
import { data } from "../../utils/data";
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'



function App() {

  const  defaultBun = data.find((elem) => {
    return elem.type === 'bun'
  })

  const [order, setOrder] = useState([]);
  const [bun, setBun] = useState( defaultBun);
  const [price, setPrice] = useReducer(countPrise,  defaultBun.price);

  function countPrise(price, added) {
    return price + added;
  }

  function changeOrder(newingredient) {
    if (newingredient.type === 'bun') {
      setPrice(newingredient.price - bun.price)
      setBun(newingredient)
    } else {
      setPrice(newingredient.price)
      setOrder([...order, newingredient])
    }
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <pre className={styles.container}>
        <main className={styles.main}>
          <BurgerIngredients data={data} onClickingredient={changeOrder} order={order} bun={bun} />
          <BurgerConstructor ingredients={data} price={price} order={order} bun={bun} />
        </main>
      </pre>
    </div>
  );
}

export default App;
