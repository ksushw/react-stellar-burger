import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./burger-ingridients.module.css";

export default function BurgerIngredients({ data, onClickIngridient, bun, order }) {

    function scroll() {
        console.log("scroll");
    }

    function count() {
        const amount = {}
        order.map((ingridient) => amount[ingridient.name] ? (amount[ingridient.name] = amount[ingridient.name] + 1) : (amount[ingridient.name] = 1))
        return amount
    }

    const counter = count();

    return (
        <section className={styles.ingridients + " pt-10 mr-5 ml-5"}>
            <p className="text text_type_main-large mb-4">
                Соберите бургер
            </p>
            <nav className={styles.navigation}>
                <Tab value="one" onClick={scroll}>
                    Булки
                </Tab>
                <Tab value="two" onClick={scroll}>
                    Соусы
                </Tab>
                <Tab value="three" onClick={scroll}>
                    Начинки
                </Tab>
            </nav>
            <div className={styles.container + ' custom-scroll'}>
                <p className="text text_type_main-medium mt-10 mb-6">
                    Булки</p>
                <ul className={styles.division}>
                    {data.map((ingridient) => {
                        return ingridient.type === 'bun' ? (
                            <li onClick={() => { onClickIngridient(ingridient) }} key={ingridient._id} className={styles.ingridient}>
                                {bun.name == [ingridient.name] ? <Counter count='1' size="default" extraClass="m-1" /> : null}
                                <img className="ingridient__image" src={ingridient.image} alt={ingridient.name} />
                                <div className={styles.price}>
                                    <p className="text text_type_digits-default mr-2">{ingridient.price}</p>
                                    <CurrencyIcon type="primary" />
                                </div>
                                <p className={styles.name + " text text_type_main-small"}>{ingridient.name}</p>
                            </li>) : null
                    })}
                </ul>

                <p className="text text_type_main-medium  mt-10 mb-6">
                    Соусы</p>
                <ul className={styles.division}>
                    {data.map((ingridient) => {
                        return ingridient.type === 'sauce' ? (
                            <li onClick={() => { onClickIngridient(ingridient) }} key={ingridient._id} className={styles.ingridient}>
                                {counter[ingridient.name] ? <Counter count={counter[ingridient.name]} size="default" extraClass="m-1" /> : null}
                                <img className="ingridient__image" src={ingridient.image} alt={ingridient.name} />
                                <div className={styles.price}>
                                    <p className="text text_type_digits-default mr-2">{ingridient.price}</p>
                                    <CurrencyIcon type="primary" />
                                </div>
                                <p className={styles.name + " text text_type_main-small"}>{ingridient.name}</p>
                            </li>) : null
                    })}
                </ul>

                <p className="text text_type_main-medium mt-10 mb-6">
                    Начинки</p>
                <ul className={styles.division}>
                    {data.map((ingridient) => {
                        return ingridient.type === 'main' ? (
                            <li onClick={() => { onClickIngridient(ingridient) }} key={ingridient._id} className={styles.ingridient}>
                                {counter[ingridient.name] ? <Counter count={counter[ingridient.name]} size="default" extraClass="m-1" /> : null}
                                <img className="ingridient__image" src={ingridient.image} alt={ingridient.name} />
                                <div className={styles.price}>
                                    <p className="text text_type_digits-default mr-2">{ingridient.price}</p>
                                    <CurrencyIcon type="primary" />
                                </div>
                                <p className={styles.name + " text text_type_main-small"}>{ingridient.name}</p>
                            </li>) : null
                    })}
                </ul>
            </div>
        </section>
    )
}