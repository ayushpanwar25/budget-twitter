import axios from "axios";

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOGOUT_SUCCESS,
  IS_LOADING,
} from "./types";

axios.defaults.baseURL = "http://192.168.0.10:5000";

export const isAuth = () => (dispatch) => {
  axios
    .get("/api/users/authchecker", { withCredentials: true })
    .then((res) =>
      dispatch({
        type: AUTH_SUCCESS,
        payload: res.data
      })
    )
    .catch(() => {
      dispatch({
        type: AUTH_FAIL
      });
    });
}

export const register = ({ username, password }) => (dispatch) => {
  const headers = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ username, password });
  axios
    .post("/api/users/sign-up", body, headers)
    .then((res) => {
      console.log(res.data);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      dispatch({ type: IS_LOADING });
    })
    .catch((err) => {
      dispatch({
        type: REGISTER_FAIL
      });
      dispatch({ type: IS_LOADING })
    });
};

export const login = ({ username, password }) => (dispatch) => {
  const headers = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ username, password });
  axios
    .post("/api/users/log-in", body, headers)
    .then((res) => {
      console.log(res);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      dispatch({ type: IS_LOADING });
    }
    )
    .catch((err) => {
      dispatch({
        type: LOGIN_FAIL
      });
      dispatch({ type: IS_LOADING })
    });
};

export const logout = () => (dispatch) => {
  axios
    .delete("/api/users/logout", { withCredentials: true })
    .then(() =>
      dispatch({
        type: LOGOUT_SUCCESS,
      })
    )
    .catch((err) => {
      console.log(err);
    });
}