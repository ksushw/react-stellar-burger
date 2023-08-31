import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { compose, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "../../services/reducers";
import thunk from "redux-thunk";

function App() {
  const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

  const enhancer = composeEnhancers(applyMiddleware(thunk));

  const store = createStore(rootReducer, enhancer);

  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.app} id="app">
          <AppHeader />
          <pre className={styles.container}>
            <main className={styles.main}>
              <BurgerIngredients />
              <BurgerConstructor />
            </main>
          </pre>
        </div>
      </DndProvider>
    </Provider>
  );
}

export default App;
