import client from './axiosConfig';

export const getAll = () => (dispatch) => {
  client
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
  client
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
  client
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
  client
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
  client
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