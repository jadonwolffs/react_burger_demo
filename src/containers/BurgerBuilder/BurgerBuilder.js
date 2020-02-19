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
    // this.setState({ enabledPurchase: sum > 0 });
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

  // addIngredientHandler = type => {
  //   const oldCount = this.props.ingredients[type];
  //   const updatedValue = oldCount + 1;
  //   const newIngredients = {
  //     ...this.props.ingredients
  //   };
  //   newIngredients[type] = updatedValue;
  //   const priceIncrement = PRICES[type];
  //   const oldPrice = this.state.price;
  //   const newPrice = oldPrice + priceIncrement;
  //   this.setState({ price: newPrice, ingredients: newIngredients });
  //   console.log(
  //     "[BurgerBuilder.js] increased price from " + oldPrice + " to " + newPrice
  //   );
  //   this.checkPurchaseState(newIngredients);
  // };

  // removeIngredientHandler = type => {
  //   const oldCount = this.props.ingredients[type];
  //   const newIngredients = {
  //     ...this.props.ingredients
  //   };
  //   if (oldCount > 0) {
  //     const updatedValue = oldCount - 1;
  //     newIngredients[type] = updatedValue;
  //     const priceIncrement = PRICES[type];
  //     const oldPrice = this.state.price;
  //     const newPrice = oldPrice - priceIncrement;
  //     this.setState({ price: newPrice, ingredients: newIngredients });
  //     console.log(
  //       "[BurgerBuilder.js] reduced price from " + oldPrice + " to " + newPrice
  //     );
  //   }
  //   this.checkPurchaseState(newIngredients);
  // };

  goToCheckout = () => {
    const query = [];
    for (let i in this.props.ingredients) {
      query.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.props.ingredients[i])
      );
    }
    query.push("price=" + this.props.price);
    const string = query.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + string
    });
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
