import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import styles from "./CheckoutSummary.module.css";
const comp = props => {
  return (
    <div className={styles.CheckoutSummary}>
      <h1>Enjoy!</h1>
      <div style={{width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button type="Danger" clicked={props.cancel}>
        Cancel
      </Button>
      <Button type="Success" clicked={props.proceed}>
        Proceed
      </Button>
    </div>
  );
};
export default comp;
