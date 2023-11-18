import { useEffect } from "react";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/modal-overlay";
import { createPortal } from "react-dom";
import { FC, Dispatch, KeyboardEvent } from "react";

interface IMovieProps {
  title?: string;
  visible: boolean;
  setVisible?: Dispatch<boolean>;
}

export const Modal: FC<IMovieProps> = ({
  children,
  title = "",
  visible,
  setVisible,
}) => {
  useEffect(() => {
    if (visible) {
      document.addEventListener("keyup", (e) => closeByEscape(e));
    }
    return () => {
      document.removeEventListener("keyup", (e) => closeByEscape(e));
    };
  }, [visible, closeByEscape]);

  function close() {
    if (setVisible) {
      setVisible(false);
    }
  }

  function closeByEscape(e: { bubbles: boolean; key: string }) {
    if (e.key === "Escape") {
      close();
    }
  }

  const modal: HTMLElement | null = document.getElementById("modals");

  return (
    <>
      {visible &&
        modal &&
        createPortal(
          <>
            <ModalOverlay onClick={close} />
            <div className={styles.modal}>
              <div className={styles.title}>
                <h2 className="text text_type_main-large">{title}</h2>
                <CloseIcon type="primary" onClick={close} />
              </div>
              {children}
            </div>
          </>,
          modal,
        )}
    </>
  );
};
