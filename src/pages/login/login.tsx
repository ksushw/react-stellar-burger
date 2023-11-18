import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, FormEvent } from "react";
import { useSelector } from "../../services/types/hooks";
import { useProvideAuth } from "../../components/UseAuth/useAuth";
import handleChange from "../../utils/handleChange";

export default function Login() {
  const [email, setNewEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { user, isAuth } = useSelector((store) => store.regisrationReducer);

  const { signIn } = useProvideAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const path = location.state?.path;

  async function makeRegistration(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    signIn(email, password);
  }

  useEffect(() => {
    console.log(isAuth);
    if (user) {
      console.log(path);
      if (path) {
        navigate(path, { replace: false });
      } else {
        navigate("/", { replace: false });
      }
    }
  }, [isAuth, navigate]);
  const { isAuthorized } = useProvideAuth();
  async function getAuth() {
    await isAuthorized();
  }
  useEffect(() => {
    getAuth();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <p className="text text_type_main-medium">Вход</p>
        <form className={styles.form + " mb-20"} onSubmit={makeRegistration}>
          <EmailInput
            onChange={(e) => handleChange(e, setNewEmail)}
            name={"email"}
            isIcon={false}
            extraClass="mt-6"
            value={email}
          />
          <PasswordInput
            onChange={(e) => handleChange(e, setPassword)}
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
