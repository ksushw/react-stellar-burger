import { useEffect } from "react";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/modal-overlay";
import { createPortal } from "react-dom";
import { FC, Dispatch } from "react";

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
      document.addEventListener("keyup", closeByEscape);
    }
    return () => {
      document.removeEventListener("keyup", closeByEscape);
    };
  }, [visible, closeByEscape]);

  function close() {
    if (setVisible) {
      setVisible(false);
    }
  }

  function closeByEscape(e: KeyboardEvent) {
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
