import AppHeader from "../../components/app-header/app-header";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./fogot-password.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  profileDataChange,
  RESTORE_PASSWORD_SUCCESS,
} from "../../services/actions/profile";

import { useSelector, useDispatch, shallowEqual } from "react-redux";

export default function FogotPassword() {
  const [email, setEmail] = useState("");
  const changePasswordMessage = useSelector(
    (store) => store.changePasswordReducer.changePasswordMessage,
    shallowEqual,
  );
  function changeEmail(e) {
    setEmail(e.target.value);
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendEmail = async (event) => {
    event.preventDefault();
    dispatch(profileDataChange(email));
  };

  useEffect(() => {
    if (changePasswordMessage !== "") {
      dispatch({
        type: RESTORE_PASSWORD_SUCCESS,
        message: "",
      });
      navigate("/reset-password");
    }
  }, [changePasswordMessage]);

  return (
    <>
      <AppHeader></AppHeader>
      <div className={styles.container}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
        <form className={styles.form + " mb-20"} onSubmit={sendEmail}>
          <EmailInput
            onChange={changeEmail}
            name={"e-mail"}
            errorText={"Введите e-mail корректно"}
            isIcon={false}
            extraClass="mt-6"
            value={email}
          />

          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass="mt-6"
          >
            Восстановить
          </Button>
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
