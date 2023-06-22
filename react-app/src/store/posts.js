const GET_ALL_POSTS = "posts/GET_ALL_POSTS";
const GET_POST = "posts/GET_POST";
const CREATE_POST = "posts/CREATE_POST";
const EDIT_POST = "posts/EDIT_POST";
const DELETE_POST = "posts/DELETE_POST";

// const ADD_LIKE_TO_POST = "posts/ADD_LIKE_TO_POST";

const getAllPostsAction = (posts) => ({
  type: GET_ALL_POSTS,
  posts,
});

const getOnePostAction = (post) => ({
  type: GET_POST,
  post,
});

const createPostAction = (post) => ({
  type: CREATE_POST,
  post,
});

const editPostAction = (post) => ({
  type: EDIT_POST,
  post,
});

const deletePostAction = (postId) => ({
  type: DELETE_POST,
  postId,
});

// const createLikeAction = (post) => ({
//   type: ADD_LIKE_TO_POST,
//   post,
// });

export const getAllPostsThunk = () => async (dispatch) => {
  const res = await fetch("/api/posts");

  if (res.ok) {
    const { posts } = await res.json();
    dispatch(getAllPostsAction(posts));
    return posts;
  } else {
    return "==========> getAllPostsThunk res is not ok <==========";
  }
};

export const getOnePostThunk = (postId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${postId}`);

  if (res.ok) {
    const post = await res.json();
    dispatch(getOnePostAction(post));
    return post;
  } else {
    return "==========> getOnePostThunk res is not ok <==========";
  }
};

export const createPostThunk = (post) => async (dispatch) => {
  const res = await fetch("/api/posts/new", {
    method: "POST",
    body: post,
  });

  if (res.ok) {
    const post = await res.json();
    dispatch(createPostAction(post));
    return post;
  } else {
    return "==========> createPostThunk res is not ok <==========";
  }
};

export const editPostThunk = (post, id) => async (dispatch) => {
  const res = await fetch(`/api/posts/edit/${id}`, {
    method: "PUT",
    body: post,
  });

  if (res.ok) {
    const post = await res.json();
    dispatch(editPostAction(post));
    return post;
  } else {
    return "==========> editPostThunk res is not ok <==========";
  }
};

export const deletePostThunk = (postId) => async (dispatch) => {
  const res = await fetch(`/api/posts/delete/${postId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deletePostAction(postId));
    return { message: "delete successful" };
  } else {
    return "==========> deletePostThunk res is not ok <==========";
  }
};

// export const addLikeToPostThunk = (postId) => async (dispatch) => {
//     const res = await fetch(`/api/posts/${postId}/like`, {
//         method: "POST",
//         body: postId
//     });

//     if(res.ok) {
//         const post = await res.json()
//         dispatch(createLikeAction(post))
//         return post
//     } else {
//         return "==========> addLikeToPostThunk res is not ok <==========";
//     };
// };

const initState = {};
function postReducer(state = initState, action) {
  let newState;
  switch (action.type) {
    case GET_ALL_POSTS:
      newState = { ...state };
      action.posts.forEach((post) => {
        newState[post.id] = post;
      });
      return newState;
    case GET_POST:
      newState = { ...state };
      newState[action.post.id] = action.post;
      return newState;
    case CREATE_POST:
      newState = { ...state };
      newState[action.post.id] = action.post;
      return newState;
    case EDIT_POST:
      newState = { ...state };
      newState[action.post.id] = action.post;
      return newState;
    case DELETE_POST:
      newState = { ...state };
      delete newState[action.postId];
      return newState;
    // case ADD_LIKE_TO_POST:
    //   newState = {...state};
    //   newState[action.post.id] = action.post;
    //   return newState;
    default:
      return state;
  }
}

export default postReducer;
