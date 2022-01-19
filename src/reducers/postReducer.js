const initialState = {
  posts: [],
};

export default function (state = initialState, action) {

  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        posts: action.payload
      };

    case "POST_SUCCESS":
      return {
        posts: [...state.posts, action.payload]
      }

    case "EDIT_SUCCESS":
      state.posts.map(post => {
        if (post.id === action.payload.id) {
          return action.payload;
        }
        return post;
      });
      return {
        posts: [...state.posts]
      }

    case "DELETE_SUCCESS":
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload)
      }

    default:
      return state;
  }
}