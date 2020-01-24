import React from "react";
import logo_png from "../../assets/images/wolff-logo.png";
import styles from "./Logo.module.css";
const logo = props => {
  return (
    <div className={styles.Logo}>
      <img src={logo_png} alt="Burgers" />
    </div>
  );
};
export default logo;
