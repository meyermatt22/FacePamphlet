import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOnePostThunk } from "../../store/posts";
import { useHistory, useParams, NavLink } from "react-router-dom";


function PostPageSingle() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getOnePostThunk(id))
    }, [dispatch, id]);

    const posts = useSelector(state => state.posts)

    if (!posts) return null

    return (
        <div>
            <h1>post page single</h1>
            <div>
                <NavLink to={`/posts`} >click here for all posts</NavLink>
            </div>
            { posts[id]?.textContent }, created at: {new Date(posts[id]?.createdAt).toLocaleTimeString('en-US')}, on: {new Date(posts[id]?.createdAt).toLocaleDateString()}
        </div>
    )
};

export default PostPageSingle;
