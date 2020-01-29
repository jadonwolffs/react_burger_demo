import React from "react";
import styles from "./BuildControl.module.css";
const buildControl = props => {
  return (
    <div className={styles.BuildControl}>
      <div className={styles.Label}>{props.label}</div>
      <button className="text-white rounded bg-greeny hover:green-400 shadow-xl" 
      onClick={props.incrementor}>
        +
      </button>
      <button
        className="text-white rounded bg-reddy hover:red-400 shadow-xl disabled:shadow-none"
        onClick={props.decrementor}
        disabled={props.disabledInfo}
      >
        -
      </button>
    </div>
  );
};
export default buildControl;
