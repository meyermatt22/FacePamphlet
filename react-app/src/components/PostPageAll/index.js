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

    return (
        <div>
            <h1>all posts page</h1>
            <div>
                {posts?.map(({ textContent }) => (
                    <div>
                        { textContent }
                    </div>
                ))}
            </div>

        </div>
    )
}

export default AllPosts;
