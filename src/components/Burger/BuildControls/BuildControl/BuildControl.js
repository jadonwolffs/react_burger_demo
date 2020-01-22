import React from "react";
import styles from "./BuildControl.module.css";
const buildControl = props => {
  return (
    <div className={styles.BuildControl}>
      <div className={styles.Label}>{props.label}</div>
      <button className={styles.More} onClick={props.incrementor}>
        +
      </button>
      <button
        className={styles.Less}
        onClick={props.decrementor}
        disabled={props.disabledInfo}
      >
        -
      </button>
    </div>
  );
};
export default buildControl;
