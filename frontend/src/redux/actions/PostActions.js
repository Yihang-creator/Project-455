export const fetchPost = (postId) => {
    return (dispatch) => {
      fetch(`http://localhost:8080/posts/${postId}`)
        .then((response) => {
          if (!response.ok) throw new Error('API call failed');
          return response.json();
        })
        .then((data) => {
          dispatch(setPost(data));
        })
        .catch((error) => {
          console.error('Error', error);
        });
    };
};

export const setPost = (post) => {
    return {
      type: 'SET_POST',
      payload: post,
    };
  };