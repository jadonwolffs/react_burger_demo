import React, { Component } from "react";
import styles from "./Modal.module.css";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";
import PropTypes from "prop-types";

class Modal extends Component {
  shouldComponentUpdate(nextProps,nextState){
      return this.props.show!==nextProps.show || nextProps.children!==this.props.children;
  }

  componentDidUpdate(){
    console.log("[Modal.js] did update");
    
  }
  render() {
    return(<Aux>
      <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
      <div
        className={[styles.Modal, "rounded"].join(" ")}
        style={{
          transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: this.props.show ? "1" : "0"
        }}
      >
        {this.props.children}
      </div>
    </Aux>)
  };
}

Modal.propTypes = {
  modalClosed: PropTypes.func,
  show: PropTypes.bool
};
export default Modal;
