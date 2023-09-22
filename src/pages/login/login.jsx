import AppHeader from "../../components/app-header/app-header";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { Link } from "react-router-dom";

export default function Login() {
  function sdfg(e) {
    console.log(e);
  }
  return (
    <>
      <AppHeader></AppHeader>
      <div className={styles.container}>
        <p className="text text_type_main-medium">Вход</p>
        <form className={styles.form + " mb-20"}>
          <EmailInput
            onChange={sdfg}
            name={"email"}
            isIcon={false}
            extraClass="mt-6"
          />
          <PasswordInput
            onChange={sdfg}
            // value=""
            name={"password"}
            extraClass="mt-6"
          />
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            extraClass="mt-6"
          >
            Войти
          </Button>
        </form>
        <p className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь?
          <Link className="ml-2" to="/registration">
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?
          <Link className="ml-2 mt-1" to="/fogote-password">
            Восстановить пароль
          </Link>
        </p>
      </div>
    </>
  );
}
