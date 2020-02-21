import * as actions from "../actions/actions";
const initialState = {
  order: [],
  loading: false
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
        orders: state.orders.concat(newOrder)
      };
    case actions.PURCHASE_FAIL:
      return { ...state, loading: false };
    case actions.PURCHASE_START:
      return { ...state, loading: true };
    default:
      return state;
  }
};

export default reducer;
