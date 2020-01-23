import React from "react";
import Aux from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button";
const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(key => {
    return (
      <li key={key}>
        <span style={{ textTransform: "capitilize" }}>{key}</span>:{" "}
        {props.ingredients[key]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order:</h3>
      <p>A burger containing</p>
      <ul>{ingredientSummary}</ul>
      <p>
        This comes to $<strong>{props.price.toFixed(2)}</strong>
      </p>
      <p>All correct?</p>
      <Button type="Danger" clicked={props.modalClosed}>
        No, cancel
      </Button>
      <Button type="Success" clicked={props.goToCheckout}>
        Yes, continue
      </Button>
    </Aux>
  );
};
export default orderSummary;
