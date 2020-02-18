import React from "react";
import styles from "./Order.module.css";
const order = props => {
  const ingredients = [];
  for (let name in props.ingredients) {
    ingredients.push({ name: name, amount: props.ingredients[name] });
  }

  const ingredientOutput = ingredients.map(ig => {
    return (
      <span key={ig.name} style={
          {margin:'2px'}
      }>
          
        {ig.name[0].toUpperCase() + ig.name.substring(1, ig.name.length)}:{" "}
        {ig.amount}
        <br />
      </span>
    );
  });
  return (
    <div className={styles.Order}>
      <p>
        Ingredients:
        <br />
        {ingredientOutput}
        <strong>Price: {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};
export default order;
