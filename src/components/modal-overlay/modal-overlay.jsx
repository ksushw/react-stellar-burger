import styles from "./modal-overlay.module.css";

export default function ModalOverlay({ children, onClick, visible }) {
  function closeModal(e) {
    if (e.target === document.querySelector(`.${styles.modalOverlay}`)) {
      onClick(false);
    }
  }

  return (
    <>
      {visible && (
        <>
          <div
            className={styles.modalOverlay + " " + styles.modalOverlayOpen}
            onClick={(e) => closeModal(e)}
          >
            {children}
          </div>
        </>
      )}
    </>
  );
}
