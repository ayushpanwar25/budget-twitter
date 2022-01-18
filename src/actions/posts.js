import axios from "axios";

axios.defaults.baseURL = "http://192.168.0.10:5000";

export const getAll = () => (dispatch) => {
  axios
    .get("/api/posts/getAll")
    .then((res) =>
      dispatch({
        type: "FETCH_SUCCESS",
        payload: res.data
      })
    )
    .catch(() => {
      dispatch({
        type: "FETCH_FAIL"
      });
    });
}

export const getByAuthor = (authorID) => (dispatch) => {
  axios
    .get(`/api/posts/get/${authorID}`)
    .then((res) =>
      dispatch({
        type: "FETCH_SUCCESS",
        payload: res.data
      })
    )
    .catch(() => {
      dispatch({
        type: "FETCH_FAIL"
      });
    });
}

export const create = ({ author, authorID, text }) => (dispatch) => {
  const headers = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ author, authorID, text });
  axios
    .post("/api/posts/create", body, headers)
    .then((res) => {
      dispatch({
        type: "POST_SUCCESS",
        payload: res.data
      });
    })
    .catch(() => {
      dispatch({
        type: "POST_FAIL"
      });
    });
};

export const edit = (id, text) => (dispatch) => {
  const headers = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify(text);
  axios
    .post(`/api/posts/edit/${id}`, body, headers)
    .then((res) => {
      dispatch({
        type: "EDIT_SUCCESS",
        payload: res.data
      });
    })
    .catch(() => {
      dispatch({
        type: "EDIT_FAIL"
      });
    });
};

export const deletepost = (id) => (dispatch) => {
  axios
    .delete(`/api/posts/delete/${id}`)
    .then((res) =>
      dispatch({
        type: "DELETE_SUCCESS",
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch({
        type: "DELETE_FAIL"
      });
    });
}