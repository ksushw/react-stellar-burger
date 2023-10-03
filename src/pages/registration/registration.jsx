import AppHeader from "../../components/app-header/app-header";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./registration.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { registrationRequest } from "../../services/actions/registration";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

function sdfg(e, setFunction) {
  setFunction(e.target.value);
}

export default function Registration() {
  const [email, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  async function makeRegistration(event) {
    event.preventDefault();
    dispatch(registrationRequest(email, password, name));
  }

  const user = useSelector((store) => store.regisrationReducer.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (user.name) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <AppHeader></AppHeader>
      <div className={styles.container}>
        <p className="text text_type_main-medium">Регистрация</p>
        <form className={styles.form + " mb-20"} onSubmit={makeRegistration}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={(e) => sdfg(e, setName)}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mt-6"
            value={name}
          />
          <EmailInput
            onChange={(e) => sdfg(e, setNewEmail)}
            name={"email"}
            isIcon={false}
            extraClass="mt-6"
            value={email}
          />
          <PasswordInput
            onChange={(e) => sdfg(e, setPassword)}
            name={"password"}
            extraClass="mt-6"
            value={password}
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
