import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../Auxiliary/Auxiliary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Sidedrawer from "../../components/Navigation/Sidedrawer/Sidedrawer";

import styles from "./Layout.module.css";

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
        <Toolbar toggle={this.sidedrawerToggleHandler} auth={this.props.auth} />
        <Sidedrawer
          auth={this.props.auth}
          show={this.state.show}
          close={this.sidedrawerClosedHandler}
        />
        <main className={styles.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
