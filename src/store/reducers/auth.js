import { updateObject } from "../utility";

import * as actions from "../actions/actions";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: null,
  authRedirect: "/"
};
const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};
const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    userId: action.userId,
    error: null,
    loading: false
  });
};
const authFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};
const authLogout = (state, action) => {
  return updateObject(state, { token: null, userId: null });
};
const authPath = (state, action) => {
  return updateObject(state, { authRedirect: action.path });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTH_START:
      return authStart(state, action);
    case actions.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actions.AUTH_FAIL:
      return authFail(state, action);
    case actions.AUTH_LOGOUT:
      return authLogout(state, action);
    case actions.AUTH_PATH:
      return authPath(state, action);
    default:
      return state;
  }
};
export default reducer;
