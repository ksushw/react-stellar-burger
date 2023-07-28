import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientItem from '../ingredient-item/ingredient-item'
import styles from "./burger-ingredients.module.css";

export default function BurgerIngredients({ data, onClickingredient, bun, order }) {

    function scroll() {
        console.log("scroll");
    }

    function count() {
        const amount = {}
        order.map((ingredient) => amount[ingredient.name] ? (amount[ingredient.name] = amount[ingredient.name] + 1) : (amount[ingredient.name] = 1))
        return amount
    }

    const counter = count();

    return (
        <section className={styles.ingredients + " pt-10 mr-5 ml-5"}>
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
                    {data.map((ingredient) => {
                        return ingredient.type === 'bun' && (
                            <IngredientItem ingredient={ingredient} count={(ingredient == bun) && 1} onClickingredient={onClickingredient} />)
                    })}
                </ul>

                <p className="text text_type_main-medium  mt-10 mb-6">
                    Соусы</p>
                <ul className={styles.division}>
                    {data.map((ingredient) => {
                        return ingredient.type === 'sauce' && (
                            <IngredientItem ingredient={ingredient} count={counter[ingredient.name]} onClickingredient={onClickingredient} />
                        )
                    })}
                </ul>

                <p className="text text_type_main-medium mt-10 mb-6">
                    Начинки</p>
                <ul className={styles.division}>
                    {data.map((ingredient) => {
                        return ingredient.type === 'main' && (
                            <IngredientItem ingredient={ingredient} count={counter[ingredient.name]} onClickingredient={onClickingredient} />
                        )
                    })}
                </ul>
            </div>
        </section>
    )
}