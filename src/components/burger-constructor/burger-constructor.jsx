import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./burger-constructor.module.css";

import DragableEl from '../dragableEl'
import update from 'immutability-helper'
import { useCallback } from 'react'

export default function BurgerConstructor({ price, order, bun, openPopup, setOrder }) {

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        setOrder((prevCards) =>
          update(prevCards, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, prevCards[dragIndex]],
            ],
          }),
        )
      }, [])

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
                {order && (<ul className={styles.fill + ' custom-scroll'}>
                    {order.map((ingredient, index) => {
                        return (<li key={index} >
                            {/* {(ingredient.type === 'bun') ? null : <DragIcon type="primary" />} */}
                            <DragableEl id={index}  index={index} moveCard={moveCard} className={styles.ingredient}>
                                <ConstructorElement
                                    type={ingredient.type}
                                    isLocked={(ingredient.type === 'bun') ? true : false}
                                    text={ingredient.name}
                                    price={ingredient.price}
                                    thumbnail={ingredient.image}
                                    extraClass={styles.element}
                                />
                            </DragableEl>
                        </li>)
                    })}

                </ul>)}

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
                <Button htmlType="button" type="primary" size="large" onClick={() => { openPopup(true) }}>
                    Оформить заказ
                </Button>
            </div>


        </section>
    )
}