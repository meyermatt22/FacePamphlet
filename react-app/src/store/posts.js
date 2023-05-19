import { bindActionCreators } from "redux";

const GET_ALL_POSTS = 'posts/GET_ALL_POSTS';

const getAllPostsAction = (posts) => ({
    type: GET_ALL_POSTS,
    posts
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
        default:
            return state;
    };
};

export default postReducer;
