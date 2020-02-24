import React from "react";
import styles from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const buildControls = props => {
  return (
    <div className={[styles.BuildControls,"rounded text-white fill"].join(" ")} >
      <p>
        Current price: $<strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map(ctrl => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          incrementor={() => props.incrementor(ctrl.type)}
          decrementor={() => props.decrementor(ctrl.type)}
          disabledInfo={props.disabledInfo[ctrl.type]}
        />
      ))}

      <button
        onClick={props.checkout}
        className=
        //"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
         {[styles.OrderButton,"rounded px-4"].join(" ")}
        disabled={!(props.enabledPurchase)}
        
      >
        {props.auth ? "Place Order":"Signup to order"}
      </button>
    </div>
  );
};
export default buildControls;
