import AppHeader from "../../components/app-header/app-header";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed-details.module.css";

export default function FeedDetails({ open }) {
  return (
    <>
      {open && (
        <div className={styles.window}>
          <AppHeader></AppHeader>
          jghhghhjbgjhgjkg
          <div className={styles.container + " pl-5 pr-5 custom-scroll"}>
            <p className={styles.number + " text text_type_digits-medium"}>
              #034533
            </p>
            <p className="text text_type_main-medium mt-10">
              Black Hole Singularity острый бургер
            </p>
            <p className={styles.state + " text text_type_main-small mt-3"}>
              Выполнен
            </p>
            <p className="text text_type_main-medium mt-15">Состав:</p>
            <div className={styles.ingridients + " mt-6 pr-6 custom-scroll"}>
              <div className={styles.ingridient}>
                <img
                  src="https://media.istockphoto.com/id/1367357589/photo/red-heart-shaped-sky-at-sunset-beautiful-landscape-with-flowers-love-background-with-copy.jpg?s=612x612&w=0&k=20&c=VbyUaFaEvR_hAGtDmcbyw7X3E7KPVmW4GYxEYjbBGOk="
                  alt=""
                  className={styles.image}
                />
                <p className="text text_type_main-default">
                  Флюоресцентная булка R2-D3
                </p>
                <p className="text text_type_digits-default">2 x 20</p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
            <div className={styles.details + " mt-10"}>
              <FormattedDate
                date={new Date("2022-10-10T17:33:32.877Z")}
                className="text_color_inactive  text_type_main-small"
              />
              <p className="text text_type_digits-default mr-2">2 x 20</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
