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
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched:false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "your street address"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched:false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "your country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched:false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "your email"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5
        },
        valid: false,
        touched:false
      },
      method: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "fastest",
        valid:true,
        touched:false
      }
    },
    loading: false,
    submittable:false
  };
  inputChangedHandler = (event, inputIdentifier) => {
    // console.log(event.target.value);
    const newForm = {
      ...this.state.orderForm
    };
    const newElement = { ...newForm[inputIdentifier] };
    newElement.value = event.target.value;
    newElement.valid = this.checkValidity(
      event.target.value,
      newForm[inputIdentifier].validation
    );
    // console.log(newElement);
    newElement.touched= true;
    newForm[inputIdentifier] = newElement;
    let validForm = true;
    for(let inputIdentifier in newForm){
      validForm =  newForm[inputIdentifier].valid && validForm
    }
    this.setState({ orderForm: newForm ,submittable:validForm });
  };
  checkValidity = (value, validation) => {
    let isValid = true;
    if (validation) {
      if (validation.required) {
        isValid = value.trim() !== "" && isValid;
      }
      if (validation.minLength) {
        isValid = value.length >= validation.minLength && isValid;
      }
    }
    return isValid;
  };
  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (const identifier in this.state.orderForm) {
      formData[identifier] = this.state.orderForm[identifier].value;
    }
    console.log("[BurgerBuilder.js] checking out horse");
    console.log("[ContactData.js] price: " + this.props.price);

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price, //price should be recalculated on the server
      orderData: formData
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
      <form onSubmit={this.orderHandler}>
        {elements.map(el => (
          <Input
            key={el.key}
            elementType={el.config.elementType}
            elementConfig={el.config.elementConfig}
            value={el.config.value}
            changed={event => this.inputChangedHandler(event, el.key)}
            invalid={!el.config.valid}
            validate={el.config.validation}
            touched={el.config.touched}
          />
        ))}
        <Button type="Success" disabled={!this.state.submittable}>Place Order</Button>
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
