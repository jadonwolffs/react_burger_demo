import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0
  };
  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ price: +price });
    console.log("[Checkout.js] price: "+this.state.price);
    
    this.setState({ ingredients: ingredients });
  }
  proceedHandler = () => {
    this.props.history.push("/checkout/user");
  };
  cancelHandler = () => {
    this.props.history.goBack();
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          proceed={this.proceedHandler}
          cancel={this.cancelHandler}
          price={this.state.price}
        />
        <Route
          path={this.props.match.url + "/user"}
          render={(props) => <ContactData ingredients={this.state.ingredients} price={this.state.price} {...props}/>}
        />
      </div>
    );
  }
}
export default Checkout;
