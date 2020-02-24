import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";

class App extends Component {
  state = {
    show: true
  };
  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({ show: false });
    // }, 5000);
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

export default App;
