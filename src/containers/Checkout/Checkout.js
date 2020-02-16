import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route} from 'react-router-dom'
import ContactData from './ContactData/ContactData';
class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1
    }
  };
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      ingredients[param[0]] = +param[1];
    }
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
        />
        <Route path={this.props.match.url+"/user"} component={ContactData}/>
      </div>
    );
  }
}
export default Checkout;
