import * as actions from "../actions/actions";
import { updateObject } from "../utility";

const initialState = {
  ingredients: null,
  price: 3,
  error: false
};

const PRICES = {
  salad: 0.2,
  cheese: 0.3,
  meat: 2.0,
  bacon: 1.0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_INGREDIENT:
      const updatedIngredientA = {[action.ingredient]: state.ingredients[action.ingredient] + 1};
      const updatedIngredientsA = updateObject(state.ingredients,updatedIngredientA);
      const updatedStateA = {ingredients:updatedIngredientsA,price: state.price + PRICES[action.ingredient] };
      return updateObject(state,updatedStateA);
    case actions.REMOVE_INGREDIENT:
      const updatedIngredientD = {[action.ingredient]: state.ingredients[action.ingredient] - 1};
      const updatedIngredientsD = updateObject(state.ingredients,updatedIngredientD);
      const updatedStateD = {ingredients:updatedIngredientsD,price: state.price - PRICES[action.ingredient] };
      return updateObject(state,updatedStateD);
    case actions.SET_INGREDIENTS:
      return updateObject(state,{ingredients: action.ingredients,error: false,price: initialState.price})
    case actions.FAIL_INGREDIENTS:
      return updateObject(state,{error: true})
    default:
      return state;
  }
};

export default reducer;
