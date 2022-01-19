import client from './axiosConfig';

export const checkAuthentication = () => (dispatch) => {
  client
    .get("/users/verify", { withCredentials: true })
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: "AUTH_SUCCESS",
          payload: res.data
        });
      }
      else {
        dispatch({
          type: "AUTH_FAIL"
        });
      }
    })
    .catch(() => {
      dispatch({
        type: "AUTH_FAIL"
      })
    })
}

export const signup = ({ username, password }) => (dispatch) => {
  const headers = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ username, password });
  console.log(body);
  client
    .post("/users/sign-up", body, headers)
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: "SIGNUP_SUCCESS" });
      }
      else {
        dispatch({ type: "SIGNUP_FAIL" });
      }
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
  client
    .post("/users/log-in", body, headers)
    .then((res) => {
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
  client
    .delete("/users/logout", { withCredentials: true })
    .then(() =>
      dispatch({
        type: "LOGOUT_SUCCESS",
      })
    )
    .catch((err) => {
      console.log(err);
    });
}