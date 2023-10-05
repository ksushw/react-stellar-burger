import { useEffect } from "react";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

export default function Modal({
  children,
  title = "",
  visible,
  setVisible,
  isWindow,
}) {
  useEffect(() => {
    if (visible) {
      document.addEventListener("keyup", closeByEscape);
    }
    return () => {
      document.removeEventListener("keyup", closeByEscape);
    };
  }, [visible, closeByEscape]);
  const navigate = useNavigate();
  function close() {
    if (setVisible) {
      setVisible(false);
    }

    navigate("/");
    document.removeEventListener("keyup", closeByEscape);
  }

  function closeByEscape(e) {
    if (e.key === "Escape") {
      close();
    }
  }

  return (
    <>
      {visible &&
        createPortal(
          <>
            {!isWindow && <ModalOverlay onClick={close} />}

            <div
              className={styles.modal + " " + (isWindow && styles.modal_window)}
            >
              <div className={styles.title}>
                <h2 className="text text_type_main-large">{title}</h2>
                {!isWindow && <CloseIcon type="primary" onClick={close} />}
              </div>
              {children}
            </div>
          </>,
          document.body,
        )}
    </>
  );
}
