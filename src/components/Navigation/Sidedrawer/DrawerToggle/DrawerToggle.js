import React from "react";
import styles from "./DrawerToggle.module.css";
import PropTypes from "prop-types";
const drawerToggle = props => {
  return (
    <div className={styles.DrawerToggle+" rounded bg-blue"} onClick={props.clicked}>
      <div className="rounded"/>
      <div className="rounded"/>
      <div className="rounded"/>
    </div>
  );
};
drawerToggle.propTypes={
  clicked:PropTypes.func
}
export default drawerToggle;
