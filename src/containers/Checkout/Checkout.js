import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
class Checkout extends Component {
    state={
        ingredients:{
            salad:1,meat:1,cheese:1,bacon:1
        }
    }
    proceedHandler =()=>{
        this.props.history.push("/checkout/user");
    }
    cancelHandler =()=>{
        this.props.history.goBack();
    }
  render() {
    return <div><CheckoutSummary ingredients={this.state.ingredients} proceed={this.proceedHandler} cancel={this.cancelHandler}/></div>;
  }
}
export default Checkout;
