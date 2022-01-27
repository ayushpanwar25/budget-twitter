const initialState = {
  signupResponse: "",
  loginResponse: "",
  isAuthenticated: null,
  user: null,
};

export default function (state = initialState, action) {

  console.log(action.type);

  switch (action.type) {

    case "LOGIN_SUCCESS":
    case "AUTH_SUCCESS":
      return {
        isAuthenticated: true,
        user: action.payload
      };

    case "AUTH_ERROR":
    case "LOGIN_FAIL":
      return {
        user: null,
        isAuthenticated: false,
        loginResponse: action.payload
      };

    case "LOGOUT_SUCCESS":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      }

    case "SIGNUP_FAIL":
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        signupResponse: action.payload
      };

    case "AUTH_FAIL":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      }

    default:
      return state;
  }
}