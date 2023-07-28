import styles from "./app.module.css";

import { useReducer, useState } from 'react';
import { data } from "../../utils/data";
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingridients/burger-ingridients'
import BurgerConstructor from '../burger-constructor/burger-constructor'



function App() {

  const defoultBun = data.find((elem) => {
    return elem.type === 'bun'
  })

  const [order, setOrder] = useState([]);
  const [bun, setBun] = useState(defoultBun);
  const [price, setPrice] = useReducer(countPrise, defoultBun.price);

  function countPrise(price, added) {
    return price + added;
  }

  function changeOrder(newIngridient) {
    if (newIngridient.type === 'bun') {
      setPrice(newIngridient.price - bun.price)
      setBun(newIngridient)
    } else {
      setPrice(newIngridient.price)
      setOrder([...order, newIngridient])
    }
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <pre style={{
        margin: "auto",
        fontSize: "1.5rem",
        width: '100%', maxWidth: '1280px'
      }}>
        <main className={styles.main}>
          <BurgerIngredients data={data} onClickIngridient={changeOrder} order={order} bun={bun} />
          <BurgerConstructor ingridients={data} price={price} order={order} bun={bun} />
        </main>
      </pre>
    </div>
  );
}

export default App;
