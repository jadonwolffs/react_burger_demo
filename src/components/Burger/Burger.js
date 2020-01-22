import React from "react";
import Ingredient from "./Ingredient/Ingredient";
import styles from "./Burger.module.css";

const burger = props => {
  const ingredientsArray = Object.keys(props.ingredients)
    .map(ingredientKey => {
      return [...Array(props.ingredients[ingredientKey])].map((_, index) => {
        return <Ingredient key={ingredientKey + index} type={ingredientKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  // const totalIngredients = props.ingredients['salad']+props.ingredients['cheese']+props.ingredients['meat']+props.ingredients['bacon'];
  // console.log("[Burger.js] "+ingredientsArray);
  // console.log("[Burger.js] "+ingredientsArray.length);
  // console.log("[Burger.js] "+totalIngredients);

  return (
    <div className={styles.Burger}>
      <Ingredient type="bread-top" />
      {ingredientsArray.length !== 0 ? (
        ingredientsArray
      ) : (
        <p>Add some ingredients!</p>
      )}
      <Ingredient type="bread-bottom" />
    </div>
  );
};
export default burger;
