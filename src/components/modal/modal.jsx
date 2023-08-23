import { useEffect } from "react";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

export default function Modal({ children, title = "", visible, setVisible }) {
  function closeByEscape(e) {
    if (e.key === "Escape") {
      close();
    }
  }

  useEffect(() => {
    if (visible) {
      document.addEventListener("keyup", closeByEscape);
    }
    return () => {
      document.removeEventListener("keyup", closeByEscape);
    };
  }, [visible]);

  function close() {
    setVisible(false);
    document.removeEventListener("keyup", closeByEscape);
  }

  return (
    <>
      {visible && (
        <>
          <ModalOverlay onClick={close}></ModalOverlay>
          <div className={styles.modal}>
            <div className={styles.title}>
              <h2 className="text text_type_main-large">{title}</h2>
              <CloseIcon type="primary" onClick={close} />
            </div>
            {children}
          </div>
        </>
      )}
    </>
  );
}
