import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function AppHeader() {
  return (
    <header className={styles.header + " pt-4 pb-4 mt-10"} id="h">
      <div className={styles.container}>
        <Link
          to="/"
          href="#"
          className={
            styles.link + " p-4 pl-5 pr-5 text_color_inactive " + styles.active
          }
        >
          <BurgerIcon type="secondary" />
          <p className="text text_type_main-default pl-2">Конструктор</p>
        </Link>
        <Link to="/feed" className={styles.link + " p-4 pl-5 pr-5"}>
          <ListIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive pl-2">
            Лента заказов
          </p>
        </Link>
        <div className={styles.logo}>
          <Logo />
        </div>

        <Link
          to="/profile"
          className={styles.link + " p-4 pl-5 pr-5 " + styles.profile}
        >
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive pl-2">
            Личный кабинет
          </p>
        </Link>
      </div>
    </header>
  );
}
