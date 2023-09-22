import AppHeader from "../../components/app-header/app-header";
import {
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  function sdfg(e) {
    console.log(e);
  }
  return (
    <>
      <AppHeader></AppHeader>
      <div className={styles.container}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
        <form className={styles.form + " mb-20"}>
          <PasswordInput
            onChange={sdfg}
            placeholder="Введите новый пароль"
            // value=""
            name={"password"}
            extraClass="mt-6"
          />
          <Input
            type={"text"}
            placeholder="Введите новый пароль"
            onChange={sdfg}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mt-6"
          />
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            extraClass="mt-6"
          >
            Зарегистрироваться
          </Button>
        </form>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?
          <Link className="ml-2" to="/login">
            Войти
          </Link>
        </p>
      </div>
    </>
  );
}
