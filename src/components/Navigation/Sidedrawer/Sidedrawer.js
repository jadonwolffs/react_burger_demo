import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import styles from "./Sidedrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import PropTypes from 'prop-types';
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
sidedrawer.propTypes={
  close:PropTypes.func,
  show:PropTypes.bool
}
export default sidedrawer;
