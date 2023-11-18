import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

export default function AppHeader() {
  const [active, setActive] = useState("");

  useEffect(() => {
    setActive(window.location.pathname.split("/")[1] || "constructor");
  }, []);

  return (
    <header className={styles.header + " pt-4 pb-4 mt-10"} id="h">
      <div className={styles.container}>
        <Link
          to="/"
          className={
            styles.link +
            " p-4 pl-5 pr-5 text_color_inactive " +
            (active === "constructor" ? styles.active : null)
          }
          onClick={() => setActive("constructor")}
        >
          <BurgerIcon
            type={
              (active === "constructor" ? styles.active : null)
                ? "primary"
                : "secondary"
            }
          />
          <p className="text text_type_main-default pl-2">Конструктор</p>
        </Link>
        <Link
          to="/feed"
          className={
            styles.link +
            " p-4 pl-5 pr-5 " +
            (active === "feed" ? styles.active : null)
          }
          onClick={() => setActive("feed")}
        >
          <ListIcon
            type={
              (active === "feed" ? styles.active : null)
                ? "primary"
                : "secondary"
            }
          />
          <p
            className={
              (active === "feed" ? styles.active : null) +
              " text text_type_main-default text_color_inactive pl-2"
            }
          >
            Лента заказов
          </p>
        </Link>
        <Link to="/" onClick={() => setActive("constructor")}>
          <div className={styles.logo}>
            <Logo />
          </div>
        </Link>
        <Link
          to="/profile"
          className={
            styles.link +
            " p-4 pl-5 pr-5  text_color_inactive " +
            styles.profile +
            " " +
            (active === "profile" ? styles.active : null)
          }
          onClick={() => setActive("profile")}
        >
          <ProfileIcon
            type={
              (active === "profile" ? styles.active : null)
                ? "primary"
                : "secondary"
            }
          />
          <p
            className={
              "text text_type_main-default pl-2 " +
              (active === "profile" ? styles.active : null)
            }
          >
            Личный кабинет
          </p>
        </Link>
      </div>
    </header>
  );
}
