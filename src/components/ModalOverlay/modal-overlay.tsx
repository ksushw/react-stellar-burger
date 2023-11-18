import styles from "./modal-overlay.module.css";
import { Dispatch } from "react";

export default function ModalOverlay({ onClick }: { onClick: Dispatch<void> }) {
  return (
    <div
      className={styles.modalOverlay + " " + styles.modalOverlayOpen}
      onClick={(e) => onClick()}
    ></div>
  );
}
