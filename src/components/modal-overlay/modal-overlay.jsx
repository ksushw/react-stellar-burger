import styles from "./modal-overlay.module.css";

export default function ModalOverlay({ onClick }) {
  return (
    <div
      className={styles.modalOverlay + " " + styles.modalOverlayOpen}
      onClick={onClick}
    ></div>
  );
}
