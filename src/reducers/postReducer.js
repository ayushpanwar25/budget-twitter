import {
  POST_SUCCESS,
  POST_FAILURE,
  GET_POSTS,
  DELETE_POST,
} from "../actions/types";


const initialState = {
  isAuthenticated: null,
  posts: null,
};

export default function (state = initialState, action) {

  switch (action.type) {
    /*case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload
      };

    case LOGIN_SUCCESS:
    case AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };

    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
    case AUTH_FAIL:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      }
*/
    default:
      return state;
  }
}