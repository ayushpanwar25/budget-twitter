import axios from "axios";

axios.defaults.baseURL = "http://192.168.0.10:5000";

export const checkAuthentication = () => (dispatch) => {
  axios
    .get("/api/users/verify", { withCredentials: true })
    .then((res) =>
      dispatch({
        type: "AUTH_SUCCESS",
        payload: res.user
      })
    )
    .catch(() => {
      dispatch({
        type: "AUTH_FAIL"
      });
    });
}

export const signup = ({ username, password }) => (dispatch) => {
  const headers = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ username, password });
  console.log(body);
  axios
    .post("/api/users/sign-up", body, headers)
    .then((res) => {
      console.log(res.data);
      dispatch({ type: "SIGNUP_SUCCESS" });
    })
    .catch(() => {
      dispatch({
        type: "SIGNUP_FAIL"
      });
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
      console.log(res.data);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data
      });
    }
    )
    .catch((err) => {
      dispatch({
        type: "LOGIN_FAIL"
      });
    });
};

export const logout = () => (dispatch) => {
  axios
    .delete("/api/users/logout", { withCredentials: true })
    .then(() =>
      dispatch({
        type: "LOGOUT_SUCCESS",
      })
    )
    .catch((err) => {
      console.log(err);
    });
}