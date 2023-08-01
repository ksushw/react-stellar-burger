import styles from "./order-details.module.css";
import Modal from '../modal/modal'
import done from '../../images/done.png'
import { useState, useEffect } from 'react';

export default function OrderDetails({ opened, changeVisibleIngDatails }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(opened ? true : false)
    }, [opened])

    return (
        <Modal changeVisible={visible} changeVisibleDatails={changeVisibleIngDatails}>
            <p className={styles.number + " text text_type_digits-large mb-8"}>034536</p>
            <p className="text text_type_main-medium">идентификатор заказа</p>
            <img src={done} alt="Галочка" className="mt-15 mb-15" />
            <p className="text text_type_main-small mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-small text_color_inactive mb-20">Дождитесь готовности на орбитальной станции</p>
        </Modal>
    )

}
