import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

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
    checkout: false,
    loading: false,
    error: false
  };
  componentDidMount() {
    // axios
    //   .get("/ingredients.json")
    //   .then(response => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch(error => {
    //     this.setState({ error: true });
    //   });
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
    let burger = this.state.error ? (
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
      if (this.state.loading) {
        summary = <Spinner></Spinner>;
      }
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
    price: state.price
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: ing => {
      dispatch({ type: actions.ADD_INGREDIENT, ingredient: ing });
    },
    onRemoveIngredient: ing => {
      dispatch({ type: actions.REMOVE_INGREDIENT, ingredient: ing });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
