import React from "react";
import styles from "./NavigationItem.module.css";
const navitem = props => {
  return (
    <li className={styles.NavigationItem}>
      <a href={props.link} className={props.active ? styles.active : null}>{props.children}</a>
    </li>
  );
};
export default navitem;
