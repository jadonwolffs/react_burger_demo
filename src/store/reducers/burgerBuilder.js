import * as actions from "../actions/actions";
import { updateObject } from "../utility";

const initialState = {
  ingredients: null,
  price: 3,
  error: false,
  built:false
};

const PRICES = {
  salad: 0.2,
  cheese: 0.3,
  meat: 2.0,
  bacon: 1.0
};

const addIngredient = (state, action) => {
  const updatedIngredientA = {
    [action.ingredient]: state.ingredients[action.ingredient] + 1
  };
  const updatedIngredientsA = updateObject(
    state.ingredients,
    updatedIngredientA
  );
  const updatedStateA = {
    ingredients: updatedIngredientsA,
    price: state.price + PRICES[action.ingredient],
    built:true
  };
  return updateObject(state, updatedStateA);
};
const removeIngredient = (state, action) => {
  const updatedIngredientD = {
    [action.ingredient]: state.ingredients[action.ingredient] - 1
  };
  const updatedIngredientsD = updateObject(
    state.ingredients,
    updatedIngredientD
  );
  const updatedStateD = {
    ingredients: updatedIngredientsD,
    price: state.price - PRICES[action.ingredient],
    built:true
  };
  return updateObject(state, updatedStateD);
};
const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    error: false,
    price: initialState.price,
    built:false
  });
};
const failIngredients = (state, action) => {
  return updateObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actions.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actions.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actions.FAIL_INGREDIENTS:
      return failIngredients(state, action);
    default:
      return state;
  }
};

export default reducer;
