import React from "react";
import styles from "./Spinner.module.css";
const spinner = props => {
  return (
    <div className={styles.Spinner}>
      <div className={styles.DoubleBounce1}></div>
      <div className={styles.DoubleBounce2}></div>
    </div>
  );
};
export default spinner;
