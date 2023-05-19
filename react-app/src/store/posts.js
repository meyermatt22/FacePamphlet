const GET_ALL_POSTS = 'posts/GET_ALL_POSTS';
const GET_POST = 'posts/GET_POST';
const CREATE_POST = 'posts/CREATE_POST';

const getAllPostsAction = (posts) => ({
    type: GET_ALL_POSTS,
    posts
});

const getOnePostAction = (post) => ({
    type: GET_POST,
    post,
});

const createPostAction = (post) => ({
    type: CREATE_POST,
    post
});

export const getAllPostsThunk = () => async (dispatch) => {
    const res = await fetch("/api/posts");

    if(res.ok) {
        const { posts } = await res.json();
        dispatch(getAllPostsAction(posts))
        return posts
    } else {
        return "==========> getAllPostsThunk res is not ok <=========="
    }
};

export const getOnePostThunk = (postId) => async (dispatch) => {
    const res = await fetch(`/api/posts/${postId}`);

    if (res.ok) {
        const post = await res.json();
        dispatch(getOnePostAction(post));
        return post;
    } else {
        return "==========> getOnePostThunk res is not ok <=========="
    }
};

export const createPostThunk = (post) => async (dispatch) => {
    const res = await fetch('/api/posts/new', {
        method: "POST",
        body: post
    });

    console.log('inside create post thunk ========>', res)
    if(res.ok) {
        const post = await res.json();
        dispatch(createPostAction(post));
        return post
    } else {
        return "==========> createPostThunk res is not ok <=========="
    }
};

const initState = {};
function postReducer(state = initState, action) {
    let newState;
    switch (action.type) {
        case GET_ALL_POSTS:
            newState = {...state};
            action.posts.forEach((post) => {
                newState[post.id] = post
            });
            return newState;
        case GET_POST:
            newState = {...state};
            newState[action.post.id] = action.post;
            return newState;
        case CREATE_POST:
            newState = {...state};
            newState[action.post.id] = action.post;
            return newState;
        default:
            return state;
    };
};

export default postReducer;
