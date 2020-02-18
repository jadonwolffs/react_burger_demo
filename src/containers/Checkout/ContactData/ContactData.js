import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import styles from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "your name"
        },
        value: ""
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "your street address"
        },
        value: ""
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "your country"
        },
        value: ""
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "your email"
        },
        value: ""
      },
      method: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: ""
      }
    },
    loading: false
  };
  inputChangedHandler = (event, inputIdentifier) => {
    console.log(event.target.value);
    const newForm = {
      ...this.state.orderForm
    };
    const newElement = { ...newForm[inputIdentifier] };
    newElement.value = event.target.value;
    newForm[inputIdentifier] = newElement;
    this.setState({orderForm:newForm});
  };
  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    console.log("[BurgerBuilder.js] checking out horse");
    console.log("[ContactData.js] price: " + this.props.price);

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price //price should be recalculated on the server
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
    const elements = [];
    for (let key in this.state.orderForm) {
      elements.push({
        key: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form>
        {elements.map(el => (
          <Input
            key={el.key}
            elementType={el.config.elementType}
            elementConfig={el.config.elementConfig}
            value={el.config.value}
            changed={event => this.inputChangedHandler(event, el.key)}
          />
        ))}
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
