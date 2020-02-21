import React from "react";
import styles from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";
const navitem = props => {
  return (
    <li className={styles.NavigationItem}>
      <NavLink
        exact={props.exact}
        to={props.link}
        activeClassName={styles.active}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default navitem;
