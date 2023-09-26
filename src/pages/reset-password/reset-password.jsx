import AppHeader from "../../components/app-header/app-header";
import {
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { resetPassvordApi } from "../../components/api/api";

function sdfg(e, setFunction) {
  setFunction(e.target.value);
}

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [code, setcode] = useState("");
  const navigate = useNavigate();
  async function addNewPassword(event) {
    event.preventDefault();
    const res = await resetPassvordApi(newPassword, code);
    if (res) {
      navigate("/");
    }
  }

  // function reg() {
  //   fetch("https://norma.nomoreparties.space/api/auth/register", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email: "xenianevarenyh@yandex.ru",
  //       password: "password",
  //       name: "Username",
  //     }),
  //   }).then((res) => {
  //     console.log(res);
  //   });
  // }

  // useEffect(() => {
  //   reg();
  // }, []);

  return (
    <>
      <AppHeader></AppHeader>
      <div className={styles.container}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
        <form className={styles.form + " mb-20"} onSubmit={addNewPassword}>
          <PasswordInput
            onChange={(e) => sdfg(e, setNewPassword)}
            placeholder="Введите новый пароль"
            name={"password"}
            extraClass="mt-6"
            value={newPassword}
          />
          <Input
            type={"text"}
            placeholder="Введите код из письма"
            onChange={(e) => sdfg(e, setcode)}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mt-6"
            value={code}
          />
          <Button
            htmlType="submit"
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
