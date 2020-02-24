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
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");

  return { type: actions.AUTH_LOGOUT };
};
export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
    console.log("expiration time:"+expirationTime);
    
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
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", res.data.localId);

        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch(err => {
        console.log(err.response);
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const setAuthPath = path => {
  return {
    type: actions.AUTH_PATH,
    path: path
  };
};
export const authCheck = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate > new Date()) {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime())/1000
          )
        );
      } else {
        dispatch(logout());
        // axios.post("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAvocsrm4eJHjbhGQKFdeQIyfYfJEKpV8U")
      }
    }
  };
};
