import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllPostsThunk } from "../../store/posts";
import { useHistory, NavLink } from "react-router-dom";
import { getAllUsersThunk } from "../../store/user";
import { getAllProfilesThunk } from "../../store/profiles";

import './PostPageAll.css'


function AllPosts() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const [query, setQuery] = useState('');

    useEffect(() => {
        dispatch(getAllPostsThunk())
        dispatch(getAllUsersThunk())
        dispatch(getAllProfilesThunk())
    }, [dispatch]);

    const posts = useSelector(state => Object.values(state.posts))
    const users = useSelector(state => Object.values(state.users))
    const profiles = useSelector(state => Object.values(state.profiles))

    if(posts.length < 1) return <h1>where have all the posts gone?</h1>

    console.log('inside all posts, info for sort', users)

    let sortedPosts = posts.sort((a,b) => new Date(...b.createdAt.split('/').reverse()) - new Date(...a.createdAt.split('/').reverse()))

    return (
        <div id="allPosts">
            <h1>all posts page</h1>
            {sessionUser && (
                <button className="profile-edit-btn" onClick={() => history.push(`/posts/new`)}>Create a new Post</button>
            )}
            <div id="postArea">
                {sortedPosts?.map(({ textContent, id, createdAt, userId }) => (
                    <div key={id} className="post">
                        <NavLink to={`/posts/${id}`} key={id}>
                            <div>
                                <img className="profImg" src={profiles[userId]?.profPic} />
                            </div>
                            <div>
                                { textContent }
                            </div>
                           , created at: {new Date(createdAt).toLocaleTimeString('en-US')}, on: {new Date(createdAt).toLocaleDateString()}
                        </NavLink>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default AllPosts;
