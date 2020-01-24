import React, { Component } from "react";
import Aux from "../Auxiliary/Auxiliary";
import styles from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Sidedrawer from "../../components/Navigation/Sidedrawer/Sidedrawer";

class Layout extends Component {
  state = {
    show: false
  };
  sidedrawerClosedHandler = () => {
    this.setState({ show: false });
  };
  sidedrawerToggleHandler = () => {
    this.setState(prevState => {
      return { show: !prevState.show };
    });
  };
  render() {
    return (
      <Aux>
        <Toolbar toggle={this.sidedrawerToggleHandler} />
        <Sidedrawer
          show={this.state.show}
          close={this.sidedrawerClosedHandler}
        />
        <main className={styles.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
