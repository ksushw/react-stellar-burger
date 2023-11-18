import {
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useState, ChangeEvent, Dispatch, FormEvent } from "react";
import { resetPassvordApi } from "../../api/api";
import { useSelector, useDispatch } from "../../services/types/hooks";
import { RESTORE_PASSWORD_CLEAN } from "../../services/actions/profile";

function sdfg(
  e: ChangeEvent<HTMLInputElement>,
  setFunction: Dispatch<string>,
): void {
  setFunction(e.target.value);
}

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState<string>("");
  const [code, setcode] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isPasswordChanged = useSelector(
    (store) => store.changePasswordReducer.isPasswordChanged,
  );

  async function addNewPassword(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    const res: boolean = await resetPassvordApi(newPassword, code);
    if (res) {
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