import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import ContactData from "./ContactData/ContactData";
class Checkout extends Component {
  // state = {
  // ingredients: null,
  // price: 0
  // };
  // componentWillMount() {
  // const query = new URLSearchParams(this.props.location.search);
  // const ingredients = {};
  // let price = 0;
  // for (let param of query.entries()) {
  //   if (param[0] === "price") {
  //     price = param[1];
  //   } else {
  //     ingredients[param[0]] = +param[1];
  //   }
  // }
  // this.setState({ price: +price });
  // console.log("[Checkout.js] price: "+this.state.price);

  // this.setState({ ingredients: ingredients });
  // }
  proceedHandler = () => {
    this.props.history.push("/checkout/user");
  };
  cancelHandler = () => {
    this.props.history.goBack();
  };
  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ingredients) {
      summary = (
        <div>
          <CheckoutSummary
            ingredients={this.props.ingredients}
            proceed={this.proceedHandler}
            cancel={this.cancelHandler}
            price={this.props.price}
          />
          <Route
            path={this.props.match.url + "/user"}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}
const mapStateToProps = state => {
  return {
    ingredients: state.builder.ingredients,
    price: state.builder.price
  };
};
export default connect(mapStateToProps)(Checkout);
