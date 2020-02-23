import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { Switch, Route } from "react-router-dom";
import Orders from "./containers/Orders/Orders";
import Auth from './containers/Auth/Auth';

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

        </Switch>
      </div>
    );
  }
}

export default App;
