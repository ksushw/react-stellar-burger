import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./burger-constructor.module.css";
import DradAndDropWrapper from '../dradAndDropWrapper/dradAndDropWrapper'
import update from 'immutability-helper'
import { useCallback, useContext } from 'react'
import { TotalPriceContext, OrderContext } from '../../services/appContext'

export default function BurgerConstructor({ openPopup }) {

    const { price, setPrice } = useContext(TotalPriceContext);
    const { order, setOrder } = useContext(OrderContext)

    function makeOrder() {
        openPopup(true);
        setOrder({
            ...order,
            filling: []
        });
    }

    function removeIngridient(ingredient, index) {
        const newFilling = Object.assign([], order.filling);
        newFilling.splice(index, 1)
        setOrder({
            ...order,
            filling: newFilling
        })
        setPrice({ type: 'minus', price: ingredient.price })
    }


    // const moveCard = useCallback((dragIndex, hoverIndex) => {
    //     setOrder((prevCards) =>
    //         update(prevCards, {
    //             $splice: [
    //                 [dragIndex, 1],
    //                 [hoverIndex, 0, prevCards[dragIndex]],
    //             ],
    //         }),
    //     )
    // }, [])

    return (
        <section className={styles.container + " pt-4 pb-4 pl-5 pr-5 ml-5 mr-5 mt-20"}>
            <div className={styles.order}>
                {order.bun && <div className={styles.bun} >
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${order.bun.name} (верх)`}
                        price={order.bun.price}
                        thumbnail={order.bun.image}
                        extraClass={styles.element}
                    />
                </div>}
                {order.filling && (<ul className={styles.fill + ' custom-scroll'}>
                    {order.filling.map((ingredient, index) => {
                        return (<li key={index} >
                            <DradAndDropWrapper id={index} index={index} className={styles.ingredient}>
                                <ConstructorElement
                                    type={ingredient.type}
                                    isLocked={(ingredient.type === 'bun') ? true : false}
                                    text={ingredient.name}
                                    price={ingredient.price}
                                    thumbnail={ingredient.image}
                                    extraClass={styles.element}
                                    handleClose={() => removeIngridient(ingredient, index)}
                                />
                            </DradAndDropWrapper>
                        </li>)
                    })}

                </ul>)}

                {order.bun && <div className={styles.bun}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${order.bun.name} (низ)`}
                        price={order.bun.price}
                        thumbnail={order.bun.image}
                        extraClass={styles.element}
                    />
                </div>}


            </div>
            <div className={styles.price + ' mr-10'}>
                <p className="text text_type_digits-medium mr-2">{price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <div className='mt-5'>
                <Button htmlType="button" type="primary" size="large" onClick={makeOrder}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}