const initialState = {
  comments: [
    {
      id: 1,
      postId: "1",
      userId: 2,
      text: "I love this blog!",
      timestamp: "2023-06-08T00:00:00Z",
      replies: [],
    },
    {
      id: 2,
      postId: "1",
      userId: 1,
      text: "I have a secret to tell you",
      timestamp: "2023-06-08T00:05:00Z",
      replies: [
        {
          id: 4,
          parentId: 2,
          userId: 2,
          text: "What is it?",
          timestamp: "2023-06-08T00:06:00Z",
          replies: [],
        },
      ],
    },
    {
      id: 3,
      postId: "2",
      userId: 1,
      text: "Nice post!",
      timestamp: "2023-06-08T00:10:00Z",
      replies: [],
    },
  ],
};

const addReplyToComment = (comments, action) => {
  return comments.map((comment) => {
    if (comment.id === action.payload.parentId) {
      return {
        ...comment,
        replies: [...comment.replies, action.payload],
      };
    } else if (comment.replies.length > 0) {
      return {
        ...comment,
        replies: addReplyToComment(comment.replies, action),
      };
    }
    return comment;
  });
};

export const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_COMMENT":
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    // case "ADD_REPLY":
    //   return {
    //     ...state,
    //     comments: addReplyToComment(state.comments, action),
    //   };
    case "FETCH_COMMENTS_SUCCESS":
      return { ...state, comments: action.payload };
    case "FETCH_COMMENTS_FAILURE":
      return { ...state, error: action.error };
    case "ADD_REPLY_SUCCESS":
      return {
        ...state,
        comments: addReplyToComment(state.comments, action),
      };
    default:
      return state;
  }
};

