import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import ContactData from "./ContactData/ContactData";
import * as actions from '../../store/actions/index'
class Checkout extends Component {
  proceedHandler = () => {
    this.props.history.push("/checkout/user");
  };
  cancelHandler = () => {
    this.props.history.goBack();
  };
  componentWillMount(){
  this.props.onInitPurchase();
  }
  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ingredients) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null
      summary = (
        <div>
          {purchasedRedirect}
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
    price: state.builder.price,
    purchased:state.order.purchased
  };
};
const mapDispatchToProps =dispatch =>{
  return{
    onInitPurchase : ()=> dispatch(actions.purchaseInit())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Checkout);
