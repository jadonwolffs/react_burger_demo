import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import { connect } from "react-redux";
import { initFetch } from "../../store/actions/index";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
class Orders extends Component {
  componentDidMount() {
    this.props.onInit();
  }
  render() {
    return (
      <div>
        {this.props.orders.map(order => (
          <Order
            key={order.key}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    );
  }
}
const mapStateToProps = state =>{
  return {orders:state.order.orders}
}
const mapDispatchToProps = dispatch => {
  return { onInit: () => dispatch(initFetch()) };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
