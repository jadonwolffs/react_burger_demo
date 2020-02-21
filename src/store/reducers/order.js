import * as actions from "../actions/actions";
import { updateObject } from "../utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const purchaseSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.orderId });
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder)
  });
};
const purchaseFail = (state, action) => {
  return updateObject(state, { loading: false });
};
const purchaseStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const purchaseInit = (state, action) => {
  return updateObject(state, { purchased: false });
};
const fetchStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const fetchSuccess = (state, action) => {
  return updateObject(state, { orders: action.orders, loading: false });
};
const fetchFail = (state, action) => {
  return updateObject(state, { loading: false });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.PURCHASE_SUCCESS:
      return purchaseSuccess(state, action);
    case actions.PURCHASE_FAIL:
      return purchaseFail(state, action);
    case actions.PURCHASE_START:
      return purchaseStart(state, action);
    case actions.PURCHASE_INIT:
      return purchaseInit(state, action);
    case actions.FETCH_ORDER_START:
      return fetchStart(state, action);
    case actions.FETCH_ORDER_SUCCESS:
      return fetchSuccess(state, action);
    case actions.FETCH_ORDER_FAIL:
      return fetchFail(state, action);
    default:
      return state;
  }
};

export default reducer;
