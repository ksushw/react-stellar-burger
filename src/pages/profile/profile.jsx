import AppHeader from "../../components/app-header/app-header";
import {
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect } from "react";
import styles from "./profile.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useProvideAuth } from "../../components/useAuth/useAuth";
import { userInfoRequest } from "../../components/api/api";
import { REGISTRATION_OUT } from "../../services/actions/registration";

export default function Profile() {
  const [user, setUser] = useState({ name: "", email: "" });

  async function getData() {
    const user = await userInfoRequest();
    setUser(user);
  }

  useEffect(() => {
    getData();
  }, []);

  function sdfg(e) {
    setUser(e.target.value);
  }
  const navigate = useNavigate();

  const { signOut } = useProvideAuth();

  const dispatch = useDispatch();
  async function logout() {
    await signOut();
    navigate("/login", { replace: "false" });
  }

  return (
    <>
      <AppHeader></AppHeader>
      <div className={styles.container + " pl-5 pr-5"}>
        <div className={styles.navigation}>
          <Link
            to="/profile"
            className={
              styles.link +
              " text text_type_main-medium pt-4 pb-4 " +
              styles.whiteText
            }
          >
            Профиль
          </Link>
          <Link
            to="orders"
            className={
              styles.link +
              " text text_type_main-medium text_color_inactive pt-4 pb-4"
            }
          >
            История заказов
          </Link>

          <Link
            className={
              styles.link +
              " text text_type_main-medium text_color_inactive pt-4 pb-4"
            }
            onClick={(e) => logout(e)}
          >
            Выход
          </Link>

          <p
            className={
              styles.text +
              " text text_type_main-default text_color_inactive mt-20"
            }
          >
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        <form className={styles.form + " mb-20"}>
          <Input
            type={"text"}
            placeholder="Имя"
            value={user.name}
            onChange={sdfg}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            icon="EditIcon"
          />
          <EmailInput
            onChange={sdfg}
            value={user.email}
            name={"email"}
            placeholder="Логин"
            isIcon={true}
            extraClass="mt-6"
          />
          <PasswordInput
            onChange={sdfg}
            value="********"
            name={"password"}
            icon="EditIcon"
            extraClass="mt-6"
          />
        </form>
      </div>
    </>
  );
}
