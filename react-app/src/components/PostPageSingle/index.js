import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOnePostThunk } from "../../store/posts";
import { useHistory, useParams, NavLink } from "react-router-dom";
import PostPageEditFormModal from "../PostPageEditFormModal";
import PostDeleteModal from "../PostPageDeleteModal";
import OpenModalButton from "../OpenModalButton";


function PostPageSingle() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getOnePostThunk(id))
    }, [dispatch, id]);

    const posts = useSelector(state => state.posts)

    if (!posts[id]) return null

    return (
        <div>
            <h1>post page single</h1>
            <div>
                <NavLink to={`/home`} >click here for all posts</NavLink>
            </div>
            { posts[id]?.textContent }, created at: {new Date(posts[id]?.createdAt).toLocaleTimeString('en-US')}, on: {new Date(posts[id]?.createdAt).toLocaleDateString()}
            {sessionUser && sessionUser.id === posts[id].userId && (
                <OpenModalButton buttonClass="post-del-btn" buttonText="Delete Post" modalComponent={<PostDeleteModal postId={id}/>}/>
            )}
            {sessionUser && sessionUser.id === posts[id].userId && (
                <button className="profile-edit-btn" onClick={() => history.push(`/posts/edit/${id}`)}>edit your post</button>
            )}
        </div>
    )
};

export default PostPageSingle;
