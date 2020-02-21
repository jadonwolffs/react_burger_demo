import * as actions from "../actions/actions";
import {updateObject} from "../utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.PURCHASE_SUCCESS:
      const newOrder = updateObject(action.orderData,{id: action.orderId});
      return updateObject(state,{loading: false,purchased: true,orders: state.orders.concat(newOrder)});
    case actions.PURCHASE_FAIL:
      return updateObject(state,{loading: false });
    case actions.PURCHASE_START:
      return updateObject(state,{loading: true });
    case actions.PURCHASE_INIT:
      return updateObject(state,{purchased: false });
    case actions.FETCH_ORDER_START:
      return updateObject(state,{loading: true });
    case actions.FETCH_ORDER_SUCCESS:
      return updateObject(state,{orders: action.orders, loading: false });
    case actions.FETCH_ORDER_FAIL:
      return updateObject(state,{loading: false });
    default:
      return state;
  }
};

export default reducer;
