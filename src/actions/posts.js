import client from './axiosConfig';

export const getAll = () => (dispatch) => {
  client
    .get("/posts/getAll")
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
  client
    .get(`/posts/get/${authorID}`)
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

export const create = ({ username, id, text }) => (dispatch) => {
  const headers = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ author: username, authorID: id, text: text });
  client
    .post("/posts/create", body, headers)
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
  client
    .post(`/posts/edit/${id}`, body, headers)
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
  client
    .delete(`/posts/delete/${id}`)
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