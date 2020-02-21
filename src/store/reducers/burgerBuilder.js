import * as actions from "../actions/actions";

const initialState = {
  ingredients: null,
  price: 3,
  error:false
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
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] + 1
        },
        price: state.price + PRICES[action.ingredient]
      };
    case actions.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] - 1
        },
        price: state.price - PRICES[action.ingredient]
      };
      case actions.SET_INGREDIENTS:
      return{
        ...state,
        ingredients:action.ingredients,
        error:false,
        price:initialState.price
      }
      case actions.FAIL_INGREDIENTS:
        return{
          ...state,
          error:true
        }
    default:
      return state;
  }
};

export default reducer;
