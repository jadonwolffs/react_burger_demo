import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import styles from "./Auth.module.css";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "your email"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "your password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 8
        },
        valid: false,
        touched: false
      }
    }
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
      if (validation.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        return pattern.test(value);
      }
    }
    return isValid;
  };
  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };
    this.setState({controls:updatedControls});

  };
  render() {
    const elements = [];
    for (let key in this.state.controls) {
      elements.push({
        key: key,
        config: this.state.controls[key]
      });
    }
    const form = elements.map(element => (
      <Input
        key={element.key}
        elementType={element.config.elementType}
        elementConfig={element.config.elementConfig}
        value={element.config.value}
        changed={event => this.inputChangedHandler(event, element.key)}
        invalid={!element.config.valid}
        validate={element.config.validation}
        touched={element.config.touched}
      />
    ));
    return (
      <div className={styles.Auth}>
        <form>
          {form}
          <Button
            type="Success"
            //   disabled={!this.state.submittable}
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}
export default Auth;
