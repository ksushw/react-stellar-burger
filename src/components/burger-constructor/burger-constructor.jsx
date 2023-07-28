import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./burger-constructor.module.css";

export default function BurgerConstructor({ price, order, bun }) {

    return (
        <section className={styles.container + " pt-4 pb-4 pl-5 pr-5 ml-5 mr-5 mt-20"}>
            <div className={styles.order}>
                <div className={styles.bun} >
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${bun.name} (верх)`}
                        price={bun.price}
                        thumbnail={bun.image}
                        extraClass={styles.element}
                    />
                </div>
                <ul className={styles.fill + ' custom-scroll'}>
                    {order.map((ingridient) => {
                        return (<li key={ingridient._id} className={styles.ingridient}>
                            {(ingridient.type === 'bun') ? null : <DragIcon type="primary" />}
                            <ConstructorElement
                                type={ingridient.type}
                                isLocked={(ingridient.type === 'bun') ? true : false}
                                text={ingridient.name}
                                price={ingridient.price}
                                thumbnail={ingridient.image}
                                extraClass={styles.element}
                            />
                        </li>)
                    })}

                </ul>

                <div className={styles.bun}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${bun.name} (низ)`}
                        price={bun.price}
                        thumbnail={bun.image}
                        extraClass={styles.element}
                    />
                </div>


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