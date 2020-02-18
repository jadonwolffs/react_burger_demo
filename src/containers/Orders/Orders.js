import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
class Orders extends Component {
  state = {
    loading: true,
    orders: []
  };
  componentDidMount() {
    const fetchedOrders = [];
    axios
      .get("/orders.json")
      .then(res => {
        console.log(res.data);
        
        for (let key in res.data) {
          fetchedOrders.push({ ...res.data[key], key: key });
        }
        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch(err => {
        this.setState({ loading: false, orders: fetchedOrders });
      });
  }
  render() {
    return (
      <div>
        {this.state.orders.map(order => (
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
export default withErrorHandler(Orders, axios);
