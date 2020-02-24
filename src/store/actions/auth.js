import * as actions from "./actions";
import axios from "axios";

export const authStart = () => {
  return {
    type: actions.AUTH_START
  };
};
export const authSuccess = (token, userId) => {
  return {
    type: actions.AUTH_SUCCESS,
    token: token,
    userId: userId
  };
};
export const authFail = error => {
  return {
    type: actions.AUTH_FAIL,
    error: error
  };
};
export const logout = () => {
  return { type: actions.AUTH_LOGOUT };
};
export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime*1000);
  };
};
export const auth = (email, password, signUp) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAvocsrm4eJHjbhGQKFdeQIyfYfJEKpV8U";
    if (!signUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAvocsrm4eJHjbhGQKFdeQIyfYfJEKpV8U";
    }
    axios
      .post(url, authData)
      .then(res => {
        console.log(res);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch(err => {
        console.log(err.response);
        dispatch(authFail(err.response.data.error));
      });
  };
};
