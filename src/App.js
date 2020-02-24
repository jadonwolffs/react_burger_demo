import React, { Component } from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";

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
          {this.props.auth ? (
            <Route path="/checkout" component={Checkout} />
          ) : null}
          {this.props.auth ? <Route path="/orders" component={Orders} /> : null}
          {!this.props.auth ? <Route path="/auth" component={Auth} /> : null}
          {this.props.auth ? <Route path="/logout" component={Logout} /> : null}
          <Redirect to="/"/>
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
