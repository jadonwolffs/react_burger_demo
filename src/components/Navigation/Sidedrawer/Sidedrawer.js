import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import styles from "./Sidedrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxiliary";
const sidedrawer = props => {
  let attachedStyles = [styles.Sidedrawer, styles.Close];
  if(props.show){
      attachedStyles = [styles.Sidedrawer, styles.Open]
  }
  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.close} />
      <div className={attachedStyles.join(" ")}>
        <div className={styles.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};
export default sidedrawer;
