import client from './axios.config';

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
  client
    .post("/users/signup", body, headers)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: "SIGNUP_SUCCESS",
          payload: res.data
        });
      }
      else {
        dispatch({
          type: "SIGNUP_FAIL",
          payload: res.data
        });

      }
    })
    .catch((err) => {
      dispatch({
        type: "SIGNUP_FAIL",
        payload: err.response.data
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
    .post("/users/login", body, headers)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: res.data
        });
      }
      else {
        dispatch({
          type: "LOGIN_FAIL",
          payload: res.data
        });
      }
    }
    )
    .catch((err) => {
      dispatch({
        type: "LOGIN_FAIL",
        payload: err.response.data
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
      console.log(err.response.data);
    });
}