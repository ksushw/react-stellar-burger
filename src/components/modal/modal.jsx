import { useState, useEffect } from 'react';
import styles from "./modal.module.css";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay'


export default function Modal({ children, title = '', changeVisible, changeVisibleDatails }) {

    const [visible, changeVisiblility] = useState(true);

    function closeByEscape(e) {
        if (e.key === "Escape") {
            close()
        };
    }

    useEffect(() => {
        changeVisiblility(changeVisible)
    }, [changeVisible])

    useEffect(() => {
        document.addEventListener('keyup', (e) => closeByEscape(e))
    }, [])

    function close() {
        changeVisiblility(false);
        changeVisibleDatails(false);
        document.removeEventListener('keyup', (e) => closeByEscape(e))
    }

    return (
        <>
            {visible && (<><ModalOverlay onClick={close} ></ModalOverlay>
                <div className={styles.modal}>
                    <div className={styles.title}>
                        <h2 className="text text_type_main-large">{title}</h2>
                        <CloseIcon type="primary" onClick={close} />
                    </div>
                    {children}
                </div></>
            )}
        </>
    )

}
