import React, { Component } from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { connect } from "react-redux";
import { authCheck } from "./store/actions/index";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const asyncCheckout = asyncComponent(()=>{
  return import('./containers/Checkout/Checkout')
});
const asyncOrders = asyncComponent(()=>{
  return import('./containers/Orders/Orders')
});
const asyncAuth = asyncComponent(()=>{
  return import('./containers/Auth/Auth')
});
const asyncLogout = asyncComponent(()=>{
  return import('./containers/Auth/Logout/Logout')
});

class App extends Component {
  state = {
    show: true
  };
  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({ show: false });
    // }, 5000);
    this.props.onAuthCheck();
  }
  render() {
    return (
      <div>
        <Layout>
          {/* {this.state.show ? <BurgerBuilder /> : null} */}
          {/* <Checkout/> */}
        </Layout>
        <Switch>
          {this.state.show ? <Route path="/" exact component={BurgerBuilder} />: null}
          {this.props.auth ? <Route path="/checkout" component={asyncCheckout} />: null}
          {this.props.auth ? <Route path="/orders" component={asyncOrders} /> : null}
          {!this.props.auth ? <Route path="/auth" component={asyncAuth} /> : null}
          {this.props.auth ? <Route path="/logout" component={asyncLogout} /> : null}
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth.token !== null
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAuthCheck: () => dispatch(authCheck())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
