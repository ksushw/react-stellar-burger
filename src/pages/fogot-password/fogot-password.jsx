import AppHeader from "../../components/app-header/app-header";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./fogot-password.module.css";
import { Link } from "react-router-dom";

export default function FogotPassword() {
  function sdfg(e) {
    console.log(e);
  }
  return (
    <>
      <AppHeader></AppHeader>
      <div className={styles.container}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
        <form className={styles.form + " mb-20"}>
          <EmailInput
            onChange={sdfg}
            name={"Укажите e-mail"}
            isIcon={false}
            extraClass="mt-6"
          />
          <Link to="/reset-password">
            <Button
              htmlType="button"
              type="primary"
              size="medium"
              extraClass="mt-6"
            >
              Восстановить
            </Button>
          </Link>
        </form>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
          <Link className="ml-2" to="/login">
            Войти
          </Link>
        </p>
      </div>
    </>
  );
}
