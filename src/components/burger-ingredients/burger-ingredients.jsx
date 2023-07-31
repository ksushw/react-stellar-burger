import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientItem from '../ingredient-item/ingredient-item'
import styles from "./burger-ingredients.module.css";

export default function BurgerIngredients({ data, onClickingredient, bun, order }) {



    
    // Позиция таба
    const [position, setPosition] = useState('bun');

    //Определяет активный таб
    function changePosition() {
        const sausePosition = document.querySelector(`#sauce`).offsetTop;
        const mainPosition = document.querySelector(`#main`).offsetTop;
        const scrollPosition = document.querySelector('#container').scrollTop;

        if (scrollPosition + 200 < sausePosition) {
            setPosition('bun')
        } else if (scrollPosition + 200 < mainPosition) {
            setPosition('sauce')
        } else {
            setPosition('main')
        }
    }

    // Скролл до нужного блока
    function scroll(id) {
        document.querySelector(`#${id}`).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }



    // Количество ингридиентов определяет
    function count() {
        const amount = {}
        order.map((ingredient) => amount[ingredient.name] ? (amount[ingredient.name] = amount[ingredient.name] + 1) : (amount[ingredient.name] = 1))
        return amount
    }

    // Объект с числом ингридиентов в заказе
    const counter = count();

    return (
        <section className={styles.ingredients + " pt-10 mr-5 ml-5"}>
            <p className="text text_type_main-large mb-4">
                Соберите бургер
            </p>
            <nav className={styles.navigation}>
                <Tab value="one" onClick={() => scroll('buns')} active={position === 'bun'}>
                    Булки
                </Tab>
                <Tab value="two" onClick={() => scroll('sauce')} active={position === 'sauce'}>
                    Соусы
                </Tab>
                <Tab value="three" onClick={() => scroll('main')} active={position === 'main'}>
                    Начинки
                </Tab>
            </nav>
            <div className={styles.container + ' custom-scroll'} id='container' onScroll={changePosition}>
                <p className="text text_type_main-medium pt-10 pb-6" id='buns'>
                    Булки</p>
                <ul className={styles.division}>
                    {data.map((ingredient) => {
                        return ingredient.type === 'bun' && (
                            <IngredientItem ingredient={ingredient} count={(ingredient == bun) && 1} onClickingredient={onClickingredient} />)
                    })}
                </ul>

                <p className="text text_type_main-medium  pt-10 pb-6" id='sauce'>
                    Соусы</p>
                <ul className={styles.division}>
                    {data.map((ingredient) => {
                        return ingredient.type === 'sauce' && (
                            <IngredientItem ingredient={ingredient} count={counter[ingredient.name]} onClickingredient={onClickingredient} />
                        )
                    })}
                </ul>

                <p className="text text_type_main-medium pt-10 pb-6" id='main'>
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