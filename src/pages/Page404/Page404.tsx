import styles from "./Page404.module.css";
import { Link } from "react-router-dom";

export default function Page404() {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div>
            <div className={styles.box_of_star1}>
              <div className={styles.star + " " + styles.star_position1}></div>
              <div className={styles.star + " " + styles.star_position2}></div>
              <div className={styles.star + " " + styles.star_position3}></div>
              <div className={styles.star + " " + styles.star_position4}></div>
              <div className={styles.star + " " + styles.star_position5}></div>
              <div className={styles.star + " " + styles.star_position6}></div>
              <div className={styles.star + " " + styles.star_position7}></div>
            </div>
            <div className={styles.box_of_star2}>
              <div className={styles.star + " " + styles.star_position1}></div>
              <div className={styles.star + " " + styles.star_position2}></div>
              <div className={styles.star + " " + styles.star_position3}></div>
              <div className={styles.star + " " + styles.star_position4}></div>
              <div className={styles.star + " " + styles.star_position5}></div>
              <div className={styles.star + " " + styles.star_position6}></div>
              <div className={styles.star + " " + styles.star_position7}></div>
            </div>
            <div className={styles.box_of_star3}>
              <div className={styles.star + " " + styles.star_position1}></div>
              <div className={styles.star + " " + styles.star_position2}></div>
              <div className={styles.star + " " + styles.star_position3}></div>
              <div className={styles.star + " " + styles.star_position4}></div>
              <div className={styles.star + " " + styles.star_position5}></div>
              <div className={styles.star + " " + styles.star_position6}></div>
              <div className={styles.star + " " + styles.star_position7}></div>
            </div>
            <div className={styles.box_of_star4}>
              <div className={styles.star + " " + styles.star_position1}></div>
              <div className={styles.star + " " + styles.star_position2}></div>
              <div className={styles.star + " " + styles.star_position3}></div>
              <div className={styles.star + " " + styles.star_position4}></div>
              <div className={styles.star + " " + styles.star_position5}></div>
              <div className={styles.star + " " + styles.star_position6}></div>
              <div className={styles.star + " " + styles.star_position7}></div>
            </div>
            <div data-js="astro" className={styles.astronaut}>
              <div className={styles.head}></div>
              <div className={styles.arm + " " + styles.arm_left}></div>
              <div className={styles.arm + " " + styles.arm_right}></div>
              <div className={styles.body}>
                <div className={styles.panel}></div>
              </div>
              <div className={styles.leg + " " + styles.leg_left}></div>
              <div className={styles.leg + " " + styles.leg_right}></div>
              <div className={styles.schoolbag}></div>
            </div>
          </div>
          <div className={styles.content}>
            <h1 className={styles.title + " text text_type_main-large mb-5"}>
              Оооп! Ошибка 404
            </h1>
            <p className="text text_type_main-medium">
              Страницы которую вы запрашиваете не существует
            </p>
            <br />
            <br />
            <p className="text text_type_main-medium">
              проверьте адресс или перейдите на{" "}
              <Link to="/" className={styles.link}>
                Главную страницу
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
