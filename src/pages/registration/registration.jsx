import AppHeader from "../../components/app-header/app-header";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./registration.module.css";
import { Link } from "react-router-dom";

export default function Registration() {
  function sdfg(e) {
    console.log(e);
  }
  return (
    <>
      <AppHeader></AppHeader>
      <div className={styles.container}>
        <p className="text text_type_main-medium">Регистрация</p>
        <form className={styles.form + " mb-20"}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={sdfg}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mt-6"
          />
          <EmailInput
            onChange={sdfg}
            name={"email"}
            isIcon={false}
            extraClass="mt-6"
          />
          <PasswordInput onChange={sdfg} name={"password"} extraClass="mt-6" />
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
