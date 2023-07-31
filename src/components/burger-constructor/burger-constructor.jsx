import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./burger-constructor.module.css";

export default function BurgerConstructor({ price, order, bun }) {

    return (
        <section className={styles.container + " pt-4 pb-4 pl-5 pr-5 ml-5 mr-5 mt-20"}>
            <div className={styles.order}>
                {bun && <div className={styles.bun} >
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${bun.name} (верх)`}
                        price={bun.price}
                        thumbnail={bun.image}
                        extraClass={styles.element}
                    />
                </div>}
                <ul className={styles.fill + ' custom-scroll'}>
                    {order.map((ingredient) => {
                        return (<li key={ingredient._id} className={styles.ingredient}>
                            {(ingredient.type === 'bun') ? null : <DragIcon type="primary" />}
                            <ConstructorElement
                                type={ingredient.type}
                                isLocked={(ingredient.type === 'bun') ? true : false}
                                text={ingredient.name}
                                price={ingredient.price}
                                thumbnail={ingredient.image}
                                extraClass={styles.element}
                            />
                        </li>)
                    })}

                </ul>

                {bun && <div className={styles.bun}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${bun.name} (низ)`}
                        price={bun.price}
                        thumbnail={bun.image}
                        extraClass={styles.element}
                    />
                </div>}


            </div>
            <div className={styles.price + ' mr-10'}>
                <p className="text text_type_digits-medium mr-2">{price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <div className='mt-5'>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>


        </section>
    )
}