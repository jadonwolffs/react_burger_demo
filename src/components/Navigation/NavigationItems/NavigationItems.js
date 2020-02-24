import React from "react";
import styles from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
const navItems = props => {
  return (
    <ul className={styles.NavigationItems}>
      <NavigationItem link="/" exact>Burger Builder</NavigationItem>
     
      {props.auth ? ( <NavigationItem link="/orders" >Previous orders</NavigationItem>):null}
      {props.auth ? ( <NavigationItem link="/account" >Account</NavigationItem>):null}
      {props.auth ? <NavigationItem link="/logout" >Logout</NavigationItem>:<NavigationItem link="/auth" >Signup</NavigationItem>}
    </ul>
  );
};
export default navItems;
