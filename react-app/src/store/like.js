const GET_ALL_LIKES = "likes/GET_ALL_LIKES";
const GET_LIKE = "likes/GET_LIKE";
const GET_USERS_LIKES = "likes/GET_USERS_LIKES";

const DELETE_LIKE = "likes/DELETE_LIKE";
const CREATE_LIKE = "likes/CREATE_LIKE";

const getAllLikesAction = (Likes) => ({
  type: GET_ALL_LIKES,
  Likes,
});

const getOneLikeAction = (Like) => ({
  type: GET_LIKE,
  Like,
});

const getAllLikesAction2 = (Likes) => ({
  type: GET_USERS_LIKES,
  Likes,
});

const deleteLikeAction = (likeId) => ({
  type: DELETE_LIKE,
  likeId,
});

const createLikeAction = (like) => ({
  type: CREATE_LIKE,
  like,
});

export const getAllLikeThunk = () => async (dispatch) => {
  const res = await fetch(`/api/likes`);


  if (res.ok) {
    const { likes } = await res.json();

    dispatch(getAllLikesAction(likes));

    return likes;
  } else {
    return "==========> getAllLikesThunk res is not ok <==========";
  }
};

export const getOneLikeThunk = (likeId) => async (dispatch) => {
  const res = await fetch(`/api/likes/${likeId}`);

  if (res.ok) {
    const like = await res.json();
    dispatch(getOneLikeAction(like));
    return like;
  } else {
    return "==========> getOneLikeThunk res is not ok <==========";
  }
};

export const getCurrentUsersLikesThunk = () => async (dispatch) => {
  const response = await fetch(`/api/likes/current`);

  if (response.ok) {
    const { likes } = await response.json();
    dispatch(getAllLikesAction2(likes));
  } else {
    return "get current user likes: response not ok";
  }
};

export const deleteLikeThunk = (likeId) => async (dispatch) => {
  const res = await fetch(`/api/likes/delete/${likeId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deleteLikeAction(likeId));
    return { message: "delete successful" };
  } else {
    return "==========> deleteLikeThunk res is not ok <==========";
  }
};

export const createLikeThunk = (like) => async (dispatch) => {
  const res = await fetch(`/api/likes/like`, {
      method: "POST",
      body: like
  });

  if(res.ok) {
      const like = await res.json()
      dispatch(createLikeAction(like))
      return like
  } else {
      return "==========> createLikeThunk res is not ok <==========";
  };
};

const initState = {};
function likeReducer(state = initState, action) {
  let newState;
  switch (action.type) {
    case GET_ALL_LIKES:
      newState = { ...state };
      action.Likes.forEach((like) => {
        newState[like.id] = like;
      });
      return newState;
    case GET_LIKE:
      newState = { ...state };
      newState[action.like.id] = action.like;
      return newState;
    case GET_USERS_LIKES:
      newState = { ...state };
      action.Likes.forEach((like) => {
        newState[like.id] = like;
      });
      return newState;
    case DELETE_LIKE:
      newState = {...state};
      delete newState[action.likeId];
      return newState;
    case CREATE_LIKE:
      newState = {...state};
      newState[action.like.id] = action.like;
      return newState;
    default:
      return state;
  }
}

export default likeReducer;
