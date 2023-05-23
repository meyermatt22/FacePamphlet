import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllPostsThunk } from "../../store/posts";
import { useHistory, NavLink } from "react-router-dom";
import { getAllUsersThunk } from "../../store/user";
import { getAllProfilesThunk } from "../../store/profiles";
import { createPostThunk } from "../../store/posts";
import OpenModalButton from "../OpenModalButton";
import PostDeleteModal from "../PostPageDeleteModal";

import './PostPageAll.css'


function AllPosts() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const [query, setQuery] = useState('');
    const [textContent, setTextContent] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true);
        if(validationErrors.length) return alert('Your Post has errors, cannot submit!');

        const formData = new FormData();
        formData.append('text_content', textContent);

        const newPost = await dispatch(createPostThunk(formData));

        setTextContent('');

        history.push(`/home`)
    };

    useEffect(() => {
        const errors = [];

        if (!textContent) errors.push('Please provide something!')
        setValidationErrors(errors)
    }, [ textContent ]);

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
        <div id="allpostpage">
            <h1>all posts page</h1>
            <div id="postDiv">
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    encType="multipart/form-data"
                    id="newPostForm"
                >
                    <div className="form-input-box text-input">
                        <div><label for="name"></label></div>
                        <input
                            placeholder="What's on you mind?"
                            type="textArea"
                            name="textContent"
                            onChange={(e) => setTextContent(e.target.value)}
                            value={textContent}
                            required={true}
                            >
                        </input>
                    </div>
                </form>
            </div>
            <div id="allPosts">
                <div id="postArea">
                    {sortedPosts?.map(({ textContent, id, createdAt, userId }) => (
                        <div key={id} className="post">
                            <div className="postBox" to={`/posts/${id}`} key={id}>
                                <div className="createInfo">
                                    <img className="profImg" src={profiles[userId - 1]?.profPic} />
                                    <div className="ciS">
                                        <div className="pText">
                                            Posted by: {users[userId - 1]?.username}
                                        </div>
                                        <div className="pText">
                                            Posted at: {new Date(createdAt).toLocaleTimeString('en-US')}, on: {new Date(createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                                <div className="textContent">
                                    { textContent }
                                </div>
                            </div>
                            {sessionUser && sessionUser.id === userId && (
                                <OpenModalButton buttonClass="post-del-btn" buttonText="Delete Post" modalComponent={<PostDeleteModal postId={id}/>}/>
                            )}
                            {sessionUser && sessionUser.id === userId && (
                                <OpenModalButton/>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default AllPosts;
