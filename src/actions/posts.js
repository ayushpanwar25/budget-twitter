import client from './axios.config';

export const get = () => (dispatch) => {
  client
    .get("/posts/get")
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
    .get(`/posts/${authorID}/get`)
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

export const editpost = (id, text) => (dispatch) => {
  const headers = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = "{\"text\":\"" + text + "\"}";
  client
    .post(`/posts/${id}/edit`, body, headers)
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

export const like = (id) => (dispatch) => {
  client
    .get(`/posts/${id}/like`)
    .then((res) =>
      dispatch({
        type: "LIKE_SUCCESS",
        payload: res.data
      })
    )
    .catch(() => {
      dispatch({
        type: "LIKE_FAIL"
      });
    });
}

export const dislike = (id) => (dispatch) => {
  client
    .get(`/posts/${id}/dislike`)
    .then((res) =>
      dispatch({
        type: "DISLIKE_SUCCESS",
        payload: res.data
      })
    )
    .catch(() => {
      dispatch({
        type: "DISLIKE_FAIL"
      });
    });
}

export const deletepost = (id) => (dispatch) => {
  client
    .delete(`/posts/${id}/delete`)
    .then((res) => {
      dispatch({
        type: "DELETE_SUCCESS",
        payload: res.data
      })
    })
    .catch(() => {
      dispatch({
        type: "DELETE_FAIL"
      });
    });
}