import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect } from "react";
import styles from "./profile.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useProvideAuth } from "../../components/UseAuth/useAuth";
import { userInfoRequest, userInfoChangeRequest } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { REGISTRATION_SET_DATA } from "../../services/actions/registration";
import Loader from "../../components/Loader/Loader";

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEdited, setIsEdited] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userData = useSelector((store) => store.regisrationReducer.user);

  async function getData() {
    const user = await userInfoRequest();
    if (user) {
      dispatch({ type: REGISTRATION_SET_DATA, user: user });
      setName(user.name);
      setEmail(user.email);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  function sdfg(e, setter) {
    setIsEdited(true);
    setter(e.target.value);
  }

  function reset() {
    setName(userData.name);
    setEmail(userData.email);
    setIsEdited(false);
  }

  async function changeData(e) {
    e.preventDefault();
    const user = await userInfoChangeRequest({ name: name, email: email });
    if (user) {
      dispatch({ type: REGISTRATION_SET_DATA, user: user });
      setName(user.name);
      setEmail(user.email);
      setIsEdited(false);
    }
  }

  const { signOut } = useProvideAuth();

  async function logout() {
    await signOut();
  }

  return (
    <>
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

        <form
          className={styles.form + " mb-20"}
          onSubmit={(e) => changeData(e)}
        >
          {name ? (
            <>
              <Input
                type={"text"}
                placeholder="Имя"
                value={name}
                onChange={(e) => sdfg(e, setName)}
                name={"name"}
                error={false}
                errorText={"Ошибка"}
                size={"default"}
                icon="EditIcon"
              />
              <EmailInput
                onChange={(e) => sdfg(e, setEmail)}
                value={email}
                name={"email"}
                placeholder="Логин"
                isIcon={true}
                extraClass="mt-6"
              />
              <PasswordInput
                onChange={(e) => sdfg(e, setPassword)}
                value={password}
                name={"password"}
                icon="EditIcon"
                extraClass="mt-6"
              />
              {isEdited && (
                <div className="mt-6">
                  <Button
                    type="secondary"
                    size="medium"
                    htmlType="reset"
                    onClick={reset}
                  >
                    Отмена
                  </Button>
                  <Button type="primary" size="medium" htmlType="submit">
                    Сохранить
                  </Button>
                </div>
              )}
            </>
          ) : (
            <Loader />
          )}
        </form>
      </div>
    </>
  );
}
