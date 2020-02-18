import React from "react";
import styles from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
const navItems = props => {
  return (
    <ul className={styles.NavigationItems}>
      <NavigationItem link="/">Burger Builder</NavigationItem>
      <NavigationItem link="/orders" >Previous orders</NavigationItem>
      <NavigationItem link="/account" >Account</NavigationItem>
      
    </ul>
  );
};
export default navItems;
