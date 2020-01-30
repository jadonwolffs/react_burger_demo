import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxiliary/Auxiliary";
// import axios from "../../axios-orders";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };
    constructor() {
      console.log("[withErrorHandler.js] constructor");
      // componentWillMount() {
      super();
      this.requ = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resp = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error: error });
        }
      );
    }
    componentWillUnmount() {
      console.log("[withErrorHandler.js] will unmount", this.requ,this.resp );
      axios.interceptors.request.eject(this.requ);
      axios.interceptors.response.eject(this.resp);
    }
    clearErrorHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Aux>
          <Modal show={this.state.error} modalClosed={this.clearErrorHandler}>
            <p>Something went wrong!</p>
            <code>{this.state.error ? this.state.error.message : null}</code>
          </Modal>
          <WrappedComponent {...this.props}></WrappedComponent>
        </Aux>
      );
    }
  };
};
export default withErrorHandler;
