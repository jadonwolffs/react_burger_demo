import React, { Component } from "react";
import { connect } from "react-redux";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import { auth, setAuthPath} from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

import styles from "./Auth.module.css";
import { Redirect } from "react-router";

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
    },
    signUp: true
  };
  componentDidMount(){
    if(this.props.built){
      this.props.onAuthPath("/checkout")
    }else{
      this.props.onAuthPath("/")
    }
  }
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
    this.setState({ controls: updatedControls });
  };
  submitHandler = event => {
    event.preventDefault();
    console.log("PATH: "+this.props.authRedirect);
    
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.signUp
    );
  };
  switchModeHandler = event => {
    event.preventDefault();
    this.setState(prevState => {
      return { signUp: !prevState.signUp };
    });
  };
  render() {
    const elements = [];
    for (let key in this.state.controls) {
      elements.push({
        key: key,
        config: this.state.controls[key]
      });
    }
    let form = elements.map(element => (
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
    if(this.props.loading){
      form = <Spinner/>
    }
    let error = null;
    if(this.props.error){
      error = (
        <p>Error: {this.props.error.message}</p>
      )
    }
    
    
    const redirect = <Redirect to={this.props.authRedirect}/>
    return (
      <div className={styles.Auth}>
        {this.props.token?redirect:null}
        {error}
        <form >
          <h1>Sign up</h1>
          {form}
          <Button type="Success" clicked={this.submitHandler}>SUBMIT</Button>
          <Button type="Danger" clicked={this.switchModeHandler}>
            Switch to {this.state.signUp ? "sign in" : "sign up"}
          </Button>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, signUp) => dispatch(auth(email, password, signUp)),
    onAuthPath: (path)=>dispatch(setAuthPath(path))
  };
};
const mapStateToProps = state => {
  return {
    loading:state.auth.loading,
    error:state.auth.error,
    token:state.auth.token,
    built:state.builder.built,
    authRedirect: state.auth.authRedirect
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
