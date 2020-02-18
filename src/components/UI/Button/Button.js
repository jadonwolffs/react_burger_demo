import React from "react";
import styles from "./Button.module.css";
const button = props => {
  return (
    <button
    disabled={props.disabled}
      onClick={props.clicked}
      className={[styles.Button, styles[props.type]].join(" ")}
    >
      {props.children}
    </button>
  );
};
export default button;
