import * as actions from "../actions/actions";
const initialState = {
  orders: [],
  loading: false,
  purchased: false
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.PURCHASE_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderID
      };
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
      };
    case actions.PURCHASE_FAIL:
      return { ...state, loading: false };
    case actions.PURCHASE_START:
      return { ...state, loading: true };
    case actions.PURCHASE_INIT:
      return { ...state, purchased: false };
    case actions.FETCH_ORDER_START:
      return { ...state, loading: true };
    case actions.FETCH_ORDER_SUCCESS:
      return { ...state, orders: action.orders, loading: false };
    case actions.FETCH_ORDER_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default reducer;
