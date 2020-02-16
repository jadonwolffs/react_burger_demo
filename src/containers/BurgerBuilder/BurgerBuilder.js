import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { Redirect } from "react-router-dom";

const PRICES = {
  salad: 0.2,
  cheese: 0.3,
  meat: 2.0,
  bacon: 1.0
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    price: 3,
    enabledPurchase: false,
    checkout: false,
    loading: false,
    error:false
  };
  componentDidMount() {
    axios.get("/ingredients.json").then(response => {
      this.setState({ ingredients: response.data });
    }).catch(error=>{this.setState({error:true})});
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
    this.setState({ enabledPurchase: sum > 0 });
  }

  puchaseHandler = () => {
    this.setState({ checkout: true });
    console.log("[BurgerBuilder.js] proceeding to checkout");
  };

  closeModalHandler = () => {
    this.setState({ checkout: false });
    console.log("[BurgerBuilder.js] cancelling checkout");
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
      "[BurgerBuilder.js] increased price from " + oldPrice + " to " + newPrice
    );
    this.checkPurchaseState(newIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const newIngredients = {
      ...this.state.ingredients
    };
    if (oldCount > 0) {
      const updatedValue = oldCount - 1;
      newIngredients[type] = updatedValue;
      const priceIncrement = PRICES[type];
      const oldPrice = this.state.price;
      const newPrice = oldPrice - priceIncrement;
      this.setState({ price: newPrice, ingredients: newIngredients });
      console.log(
        "[BurgerBuilder.js] reduced price from " + oldPrice + " to " + newPrice
      );
    }
    this.checkPurchaseState(newIngredients);
  };

  goToCheckout = () => {
    // this.setState({ loading: true });
    // console.log("[BurgerBuilder.js] checking out horse");
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.price, //price should be recalculated on the server
    //   customer: {
    //     name: "Jadon",
    //     address: {
    //       street: "Test",
    //       country: "Germany"
    //     },
    //     email: "example@example.com"
    //   },
    //   method: "toDoor"
    // };
    // axios
    //   .post("/orders.json", order)
    //   .then(response => {
    //     console.log(response);
    //     this.setState({ loading: false, checkout: false });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     this.setState({ loading: false, checkout: false });
    //   });
    this.props.history.push("/checkout");
    
    // return <Redirect to="/checkout"/>
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let summary = null;
    let burger = this.state.error ? <p>Ingredients could't be loaded!</p>: <Spinner />;
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            incrementor={this.addIngredientHandler}
            decrementor={this.removeIngredientHandler}
            disabledInfo={disabledInfo}
            price={this.state.price}
            enabledPurchase={this.state.enabledPurchase}
            checkout={this.puchaseHandler}
          />
        </Aux>
      );
      summary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          goToCheckout={this.goToCheckout}
          modalClosed={this.closeModalHandler}
          price={this.state.price}
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

export default withErrorHandler(BurgerBuilder, axios);
