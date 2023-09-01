import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";

export default function AppHeader() {
  return (
    <header className={styles.header + " pt-4 pb-4 mt-10"} id="h">
      <div className={styles.container}>
        <a href="#" className={styles.link + " p-4 pl-5 pr-5"}>
          <BurgerIcon type="primary" />
          <p className="text text_type_main-default pl-2">Конструктор</p>
        </a>
        <a href="#" className={styles.link + " p-4 pl-5 pr-5"}>
          <ListIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive pl-2">
            Лента заказов
          </p>
        </a>
        <Logo />
        <a
          href="#"
          className={styles.link + " p-4 pl-5 pr-5 " + styles.profile}
        >
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive pl-2">
            Личный кабинет
          </p>
        </a>
      </div>
    </header>
  );
}
