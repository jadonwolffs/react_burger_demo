import React from "react";
import styles from "./Input.module.css";

const input = props => {
  let element = null;
  const classes = [styles.InputElement];
  if(props.invalid && props.validate && props.touched){
      classes.push(styles.Invalid)
  }
  switch (props.elementType) {
    case "input":
      element = (
        <input
          className={classes.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      element = (
        <select
          className={classes.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      element = (
        <input
          className={classes.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
  }
  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{props.label}</label>
      {element}
    </div>
  );
};

export default input;
