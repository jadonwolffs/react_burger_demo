import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import { authCheck } from "./store/actions/index";

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
          {this.state.show ? (
            <Route path="/" exact component={BurgerBuilder} />
          ) : null}
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
        </Switch>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAuthCheck: () => dispatch(authCheck())
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));