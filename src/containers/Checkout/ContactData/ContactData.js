import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button'
import styles from './ContactData.module.css';
import classes from "./ContactData.module.css";
class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    }
  };
  render() {
    return (
      <div className={styles.ContactData}>
        <h4>Enter your contact details below</h4>
        <form>
          <input className={styles.Input}type="text" name="name" placeholder="your name" />
          <input className={styles.Input}type="email" name="email" placeholder="your email" />
          <input className={styles.Input}type="text" name="street" placeholder="your street address" />
          <input className={styles.Input}type="text" name="postal" placeholder="your postal code" />
          <Button type="Success">Place Order</Button>
        </form>
      </div>
    );
  }
}
export default ContactData;
