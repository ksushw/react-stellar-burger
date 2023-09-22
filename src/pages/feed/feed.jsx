import AppHeader from "../../components/app-header/app-header";
import styles from "./feed.module.css";
import CartList from "../../components/card-list/card-list";

export default function Feed() {
  return (
    <>
      <AppHeader></AppHeader>
      <div className={styles.container + " pl-5 pr-5"}>
        <h2 className={styles.title + " text text_type_main-large mt-10 mb-5"}>
          Лента заказов
        </h2>
        <div className={styles.feed}>
          <CartList />
        </div>
        <div className={styles.numbers + " ml-10"}>
          <div className={styles.state}>
            <div>
              <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
              <p
                className={
                  styles.digit_small + " text text_type_digits-small mt-2"
                }
              >
                234
              </p>
              <p
                className={
                  styles.digit_small + " text text_type_digits-small mt-2"
                }
              >
                234
              </p>
              <p
                className={
                  styles.digit_small + " text text_type_digits-small mt-2"
                }
              >
                234
              </p>
            </div>
            <div>
              <h3 className="text text_type_main-medium mb-6">В работе:</h3>
              <p className="text text_type_digits-small mt-2">3456</p>
              <p className="text text_type_digits-small mt-2">456</p>
              <p className="text text_type_digits-small mt-2">54678</p>
            </div>
          </div>
          <div>
            <h3 className="text text_type_main-medium">
              Выполнено за все время:
            </h3>
            <p className={styles.digit + " text text_type_digits-large"}>
              28 752
            </p>
          </div>
          <div>
            <h3 className="text text_type_main-medium">
              Выполнено за сегодня:
            </h3>
            <p className={styles.digit + " text text_type_digits-large"}>138</p>
          </div>
        </div>
      </div>
    </>
  );
}
