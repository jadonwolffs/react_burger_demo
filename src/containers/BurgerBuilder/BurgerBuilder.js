import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const PRICES = {
  salad: 0.2,
  cheese: 0.3,
  meat: 2.0,
  bacon: 1.0
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    price: 3
  };

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedValue = oldCount + 1;
    const newIngredients = {
      ...this.state.ingredients
    };
    newIngredients[type] = updatedValue;
    const priceIncrement = PRICES[type];
    const oldPrice = this.state.price;
    const newPrice = oldPrice + priceIncrement;
    this.setState({ price: newPrice, ingredients: newIngredients });
    console.log(
      "[BurgerBuilder.js] reduced price from " + oldPrice + " to " + newPrice
    );
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount > 0) {
      const updatedValue = oldCount - 1;
      const newIngredients = {
        ...this.state.ingredients
      };
      newIngredients[type] = updatedValue;
      const priceIncrement = PRICES[type];
      const oldPrice = this.state.price;
      const newPrice = oldPrice - priceIncrement;
      this.setState({ price: newPrice, ingredients: newIngredients });
      console.log(
        "[BurgerBuilder.js] reduced price from " + oldPrice + " to " + newPrice
      );
    }
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          incrementor={this.addIngredientHandler}
          decrementor={this.removeIngredientHandler}
          disabledInfo={disabledInfo}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
