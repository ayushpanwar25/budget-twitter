const initialState = {
  isAuthenticated: null,
  user: null,
};

export default function (state = initialState, action) {

  switch (action.type) {

    case "LOGIN_SUCCESS":
    case "AUTH_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };

    case "AUTH_ERROR":
    case "LOGIN_FAIL":
    case "LOGOUT_SUCCESS":
    case "SIGNUP_SUCCESS":
    case "SIGNUP_FAIL":
    case "AUTH_FAIL":
      console.log("NOT AUTHENTICATED");
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      }

    default:
      return state;
  }
}