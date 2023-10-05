import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useProvideAuth } from "../../components/UseAuth/useAuth";

function sdfg(e, setFunction) {
  setFunction(e.target.value);
}
export default function Login() {
  const [email, setNewEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, isAuth } = useSelector((store) => store.regisrationReducer);

  const { signIn } = useProvideAuth();

  const navigate = useNavigate();

  async function makeRegistration(event) {
    event.preventDefault();
    signIn(email, password);
  }

  useEffect(() => {
    if (user.name) {
      navigate("/", { replace: "false" });
    }
  }, [user, navigate]);

  useEffect(() => {
    if (isAuth) {
      return <Navigate to="/" replace />;
    }
  }, [isAuth]);
  return isAuth ? (
    <Navigate to="/" replace />
  ) : (
    <>
      <div className={styles.container}>
        <p className="text text_type_main-medium">Вход</p>
        <form className={styles.form + " mb-20"} onSubmit={makeRegistration}>
          <EmailInput
            onChange={(e) => sdfg(e, setNewEmail)}
            name={"email"}
            isIcon={false}
            extraClass="mt-6"
            value={email}
          />
          <PasswordInput
            onChange={(e) => sdfg(e, setPassword)}
            value={password}
            name={"password"}
            extraClass="mt-6"
          />
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass="mt-6"
          >
            Войти
          </Button>
        </form>
        <p className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь?
          <Link className="ml-2" to="registration">
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?
          <Link className="ml-2 mt-1" to="fogote-password">
            Восстановить пароль
          </Link>
        </p>
      </div>
    </>
  );
}
