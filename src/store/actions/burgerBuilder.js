import * as actions from "./actions";
import axios from "../../axios-orders";

export const addIngredient = name => {
  return {
    type: actions.ADD_INGREDIENT,
    ingredient: name
  };
};

export const removeIngredient = name => {
  return {
    type: actions.REMOVE_INGREDIENT,
    ingredient: name
  };
};
export const setIngredients = ingredients => {
  return { type: actions.SET_INGREDIENTS, ingredients: ingredients };
};
export const failIngredients = () =>{
    return { type: actions.FAIL_INGREDIENTS };
}
export const initializeBuilder = () => {
  return dispatch => {
    axios
    .get("/ingredients.json")
    .then(response => {
        dispatch(setIngredients(response.data));
    })
    .catch(error => {
        dispatch(failIngredients())
    });
  };
};
