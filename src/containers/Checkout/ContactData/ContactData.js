import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import styles from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };
  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    console.log("[BurgerBuilder.js] checking out horse");
    console.log("[ContactData.js] price: "+this.props.price);
    
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price, //price should be recalculated on the server
      customer: {
        name: "Jadon",
        address: {
          street: "Test",
          country: "Germany"
        },
        email: "example@example.com"
      },
      method: "toDoor"
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        console.log(response);
        this.setState({ loading: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
    this.props.history.push("/");
  };
  render() {
    let form = (
      <form>
        <input
          className={styles.Input}
          type="text"
          name="name"
          placeholder="your name"
        />
        <input
          className={styles.Input}
          type="email"
          name="email"
          placeholder="your email"
        />
        <input
          className={styles.Input}
          type="text"
          name="street"
          placeholder="your street address"
        />
        <input
          className={styles.Input}
          type="text"
          name="postal"
          placeholder="your postal code"
        />
        <Button type="Success" clicked={this.orderHandler}>
          Place Order
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={styles.ContactData}>
        <h4>Enter your contact details below</h4>
        {form}
      </div>
    );
  }
}
export default ContactData;
