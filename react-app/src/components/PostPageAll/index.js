import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"
import { getAllPostsThunk } from "../../store/posts";
import { useHistory } from "react-router-dom";

function AllPosts() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [query, setQuery] = useState('');

    useEffect(() => {
        dispatch(getAllPostsThunk())
    }, [dispatch]);

    const posts = useSelector(state => Object.values(state.posts))

    if(posts.length < 1) return <h1>where have all the posts gone?</h1>

    let sortedPosts = posts.sort((a,b) => new Date(...a.createdAt.split('/').reverse()) - new Date(...b.createdAt.split('/').reverse()))

    return (
        <div>
            <h1>all posts page</h1>
            <div>
                {sortedPosts?.map(({ textContent, id, createdAt }) => (
                    <div key={id}>
                        { textContent }, created at: {new Date(createdAt).toLocaleTimeString('en-US')}, on: {new Date(createdAt).toLocaleDateString()}
                    </div>
                ))}
            </div>

        </div>
    )
}

export default AllPosts;
