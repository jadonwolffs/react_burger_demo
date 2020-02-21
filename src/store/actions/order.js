import * as actions from "./actions";
import axios from "../../axios-orders";

export const purchaseSuccess = (id, orderData) => {
  return {
    type: actions.PURCHASE_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};
export const purchaseFail = error => {
  return {
    type: actions.PURCHASE_FAIL,
    error: error
  };
};
export const purchaseStart = () => {
  return {
    type: actions.PURCHASE_START
  };
};
export const initPurchase = orderData => {
  return dispatch => {
    dispatch(purchaseStart());
    axios
      .post("/orders.json", orderData)
      .then(response => {
        console.log(response);
        dispatch(purchaseSuccess(response.data.name, orderData));
      })
      .catch(error => {
        console.log(error);
        dispatch(purchaseFail(error));
      });
  };
};

export const purchaseInit = () =>{
  return {
    type: actions.PURCHASE_INIT
  };
};

export const ordersSuccess = (orders) =>{
  return {
    type:actions.FETCH_ORDER_SUCCESS,
    orders:orders
  }
}
export const ordersFail = (error) =>{
  return {
    type:actions.FETCH_ORDER_FAIL,
    error:error
  }
}

export const ordersStart = () =>{
  return {
    type:actions.FETCH_ORDER_START
  }
}

export const initFetch = orderData => {
  return dispatch => {
    dispatch(ordersStart());
    axios
      .get("/orders.json")
      .then(res => {
        console.log(res.data);
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({ ...res.data[key], key: key });
        }
        dispatch(ordersSuccess(fetchedOrders));
      })
      .catch(err => {
        dispatch(ordersFail(err));
      });
  };
};