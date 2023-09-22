import AppHeader from "../../components/app-header/app-header";
import {
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import { Link } from "react-router-dom";

export default function Profile() {
  function sdfg(e) {
    console.log(e);
  }
  return (
    <>
      <AppHeader></AppHeader>
      <div className={styles.container + " pl-5 pr-5"}>
        <div className={styles.navigation}>
          <Link
            to="/profile"
            className={
              styles.link +
              " text text_type_main-medium pt-4 pb-4 " +
              styles.whiteText
            }
          >
            Профиль
          </Link>
          <Link
            to="orders"
            className={
              styles.link +
              " text text_type_main-medium text_color_inactive pt-4 pb-4"
            }
          >
            История заказов
          </Link>

          <Link
            to="/login"
            className={
              styles.link +
              " text text_type_main-medium text_color_inactive pt-4 pb-4"
            }
          >
            Выход
          </Link>

          <p
            className={
              styles.text +
              " text text_type_main-default text_color_inactive mt-20"
            }
          >
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        <form className={styles.form + " mb-20"}>
          <Input
            type={"text"}
            placeholder="Имя"
            value="vladimir"
            onChange={sdfg}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            icon="EditIcon"
          />
          <EmailInput
            onChange={sdfg}
            value={"mail@stellar.burgers"}
            name={"email"}
            placeholder="Логин"
            isIcon={true}
            extraClass="mt-6"
          />
          <PasswordInput
            onChange={sdfg}
            value={"********"}
            name={"password"}
            icon="EditIcon"
            extraClass="mt-6"
          />
        </form>
      </div>
    </>
  );
}
