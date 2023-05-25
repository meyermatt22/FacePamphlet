const GET_ALL_COMMENTS = 'comments/GET_ALL_COMMENTS';
const GET_COMMENT = 'comments/GET_COMMENT';
const CREATE_COMMENT = 'comments/CREATE_COMMENT';
const DELETE_COMMENT = 'comments/DELETE_COMMENT';

const getAllCommentsAction = (Comments) => ({
    type: GET_ALL_COMMENTS,
    Comments
});

const getOneCommentAction = (Comment) => ({
    type: GET_COMMENT,
    Comment,
});

const createCommentAction = (comment) => ({
    type: CREATE_COMMENT,
    comment
});

const deleteCommentAction = (commentId) => ({
    type: DELETE_COMMENT,
    commentId,
});

export const getAllCommentsThunk = () => async (dispatch) => {
    const res = await fetch("/api/comments");


    if(res.ok) {
        const { comments } = await res.json();
        console.log('inside get all comments thunk', comments)
        dispatch(getAllCommentsAction(comments))
        console.log('inside get all comments thunk 2', comments)
        return comments
    } else {
        return "==========> getAllCommentsThunk res is not ok <=========="
    }
};

export const getOneCommentThunk = (commentId) => async (dispatch) => {
    const res = await fetch(`/api/comments/${commentId}`);

    if (res.ok) {
        const comment = await res.json();
        dispatch(getOneCommentAction(comment));
        return comment;
    } else {
        return "==========> getOneCommentThunk res is not ok <=========="
    }
};

export const createCommentThunk = (comment) => async (dispatch) => {
    console.log('111inside create comment thunk ========>', comment)
    const res = await fetch('/api/comments/new', {
        method: "POST",
        body: comment
    });

    console.log('22inside create comment thunk ========>', res)
    if(res.ok) {
        const comment = await res.json();
        dispatch(createCommentAction(comment));
        return comment
    } else {
        return "==========> createCommentThunk res is not ok <=========="
    }
};

export const deleteCommentThunk = (commentId) => async (dispatch) => {
    const res = await fetch(`/api/comments/delete/${commentId}`, {
        method: "DELETE",
    });

    if(res.ok) {
        dispatch(deleteCommentAction(commentId));
        return { 'message': 'delete successful' };
    } else {
        return "==========> deleteCommentThunk res is not ok <=========="
    };
};

const initState = {};
function commentReducer(state = initState, action) {
    let newState;
    switch (action.type) {
        case GET_ALL_COMMENTS:
            newState = {...state};
            action.Comments.forEach((comment) => {
                newState[comment.id] = comment
            });
            return newState;
        case GET_COMMENT:
            newState = {...state};
            newState[action.comment.id] = action.comment;
            return newState;
        case CREATE_COMMENT:
            newState = {...state};
            console.log('action ACTION in the reducer... ==> ', action)
            newState[action.comment.id] = action.comment;
            return newState;
        case DELETE_COMMENT:
            newState = {...state};
            delete newState[action.commentId];
            return newState;
        default:
            return state;
    };
};

export default commentReducer;
