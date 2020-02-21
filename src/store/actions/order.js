import * as actions from "./actions";
import axios from "../../axios-orders";

export const purchaseSuccess = (id,orderData) => {
  return {
    type: actions.PURCHASE_SUCCESS,
    orderId:id,
    orderData:orderData
  };
};
export const purchaseFail = (error) => {
    return {
      type: actions.PURCHASE_FAIL,
      error:error
    };
  };
export const initPurchase = (orderData) => {
  return dispatch => {
    axios
      .post("/orders.json", orderData)
      .then(response => {
        console.log(response);
        dispatch(purchaseSuccess(response.data,orderData));
      })
      .catch(error => {
        console.log(error);
        dispatch(purchaseFail(error));

      });
  };
};
