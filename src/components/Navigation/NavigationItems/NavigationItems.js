import React from "react";
import styles from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
const navItems = props => {
  return (
    <ul className={styles.NavigationItems}>
      <NavigationItem link="/" active>Burger Builder</NavigationItem>
      <NavigationItem link="/" >Previous orders</NavigationItem>
      <NavigationItem link="/" >Account</NavigationItem>
      
    </ul>
  );
};
export default navItems;
