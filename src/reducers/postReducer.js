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
        posts: [action.payload, ...state.posts]
      }

    case "EDIT_SUCCESS":
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id !== action.payload.id) {
            return post
          }
          return {
            ...post,
            text: action.payload.text
          }
        })
      }

    case "LIKE_SUCCESS":
      return state

    case "DISLIKE_SUCCESS":
      return state

    case "DELETE_SUCCESS":
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload)
      }

    default:
      return state;
  }
}