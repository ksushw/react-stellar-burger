import { CSSProperties } from "react";
import styles from "./Loader.module.css";

export default function Loader() {
  const style = (i: number): CSSProperties => {
    return { "--i": i } as CSSProperties;
  };

  return (
    <div className={styles.loader + " mt-15 mb-15"}>
      <span style={style(1)}></span>
      <span style={style(2)}></span>
      <span style={style(3)}></span>
      <span style={style(4)}></span>
      <span style={style(5)}></span>
      <span style={style(6)}></span>
      <span style={style(7)}></span>
      <span style={style(8)}></span>
      <span style={style(9)}></span>
      <span style={style(10)}></span>
      <span style={style(11)}></span>
      <span style={style(12)}></span>
      <span style={style(13)}></span>
      <span style={style(14)}></span>
      <span style={style(15)}></span>
      <span style={style(16)}></span>
      <span style={style(17)}></span>
      <span style={style(18)}></span>
      <span style={style(19)}></span>
      <span style={style(20)}></span>
    </div>
  );
}
