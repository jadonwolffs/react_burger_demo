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
    <div className={styles.BuildControls}>
      {controls.map(ctrl => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          incrementor={() => props.incrementor(ctrl.type)}
          decrementor={() => props.decrementor(ctrl.type)}
          disabledInfo={props.disabledInfo[ctrl.type]}
        />
      ))}
    </div>
  );
};
export default buildControls;
