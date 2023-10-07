import {
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import { resetPassvordApi } from "../../api/api";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { RESTORE_PASSWORD_CLEAN } from "../../services/actions/profile";

function sdfg(e, setFunction) {
  setFunction(e.target.value);
}

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [code, setcode] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isPasswordChanged } = useSelector(
    (store) => ({
      isPasswordChanged: store.changePasswordReducer.isPasswordChanged,
    }),
    shallowEqual,
  );
  async function addNewPassword(event) {
    event.preventDefault();
    const res = await resetPassvordApi(newPassword, code);
    if (res.success) {
      dispatch({
        type: RESTORE_PASSWORD_CLEAN,
      });
      if (res) {
        navigate("/");
      }
    }
  }

  if (!isPasswordChanged) {
    return <Navigate to="/login/fogote-password" />;
  }

  return (
    <>
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
