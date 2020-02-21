import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Aux from "../../hoc/Auxiliary/Auxiliary";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";

class BurgerBuilder extends Component {
  state = {
    checkout: false
  };
  componentDidMount() {
    this.props.onInit();
  }
  checkPurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    console.log("[BurgerBuilder.js] " + sum + " ingredients");
    return sum > 0;
  }

  puchaseHandler = () => {
    this.setState({ checkout: true });
    console.log("[BurgerBuilder.js] proceeding to checkout");
  };

  closeModalHandler = () => {
    this.setState({ checkout: false });
    console.log("[BurgerBuilder.js] cancelling checkout");
  };

  goToCheckout = () => {
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let summary = null;
    let burger = this.props.error ? (
      <p>Ingredients could't be loaded!</p>
    ) : (
      <Spinner />
    );
    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            incrementor={this.props.onAddIngredient}
            decrementor={this.props.onRemoveIngredient}
            disabledInfo={disabledInfo}
            price={this.props.price}
            enabledPurchase={this.checkPurchaseState(this.props.ingredients)}
            checkout={this.puchaseHandler}
          />
        </Aux>
      );
      summary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          goToCheckout={this.goToCheckout}
          modalClosed={this.closeModalHandler}
          price={this.props.price}
        />
      );
    }
    return (
      <Aux>
        <Modal show={this.state.checkout} modalClosed={this.closeModalHandler}>
          {summary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    price: state.price,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: ing => {
      dispatch(actions.addIngredient(ing));
    },
    onRemoveIngredient: ing => {
      dispatch(actions.removeIngredient(ing));
    }, 
    onInit: () => {
      dispatch(actions.initializeBuilder());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withErrorHandler(
    BurgerBuilder
    , axios)
    );
