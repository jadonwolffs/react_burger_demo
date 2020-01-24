import React,{Component} from "react";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";
class OrderSummary extends Component{

  componentDidUpdate(){
    console.log("[OrderSummary.js] did update");
    
  }
  render(){
  const ingredientSummary = Object.keys(this.props.ingredients).map(key => {
    return (
      <li key={key}>
        <span style={{ textTransform: "capitilize" }}>{key}</span>:{" "}
        {this.props.ingredients[key]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order:</h3>
      <p>A burger containing</p>
      <ul>{ingredientSummary}</ul>
      <p>
        This comes to $<strong>{this.props.price.toFixed(2)}</strong>
      </p>
      <p>All correct?</p>
      <Button type="Danger" clicked={this.props.modalClosed}>
        No, cancel
      </Button>
      <Button type="Success" clicked={this.props.goToCheckout}>
        Yes, continue
      </Button>
    </Aux>
  );
  }
};
export default OrderSummary;
