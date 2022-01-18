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
      state.posts.map(post => {
        if (post.id === action.payload) {
          return null;
        }
        return post;
      });
      return {
        posts: [...state.posts]
      }

    default:
      return state;
  }
}