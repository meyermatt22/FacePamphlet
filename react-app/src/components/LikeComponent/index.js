import { useDispatch, useSelector } from "react-redux";
import { addLikeToPostThunk, getOnePostThunk } from "../../store/posts";
import { useEffect } from "react";
import { getAllLikeThunk } from "../../store/like";
import LikeBtn from "./likeBtn";


function LikeComponent({postId2, sessionUser}) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllLikeThunk())
        dispatch(getOnePostThunk(postId2))
    }, [dispatch, postId2]);

    const likes = useSelector((state) => Object.values(state.likes))
    const posts = useSelector(state => state.posts)


    // console.log('inside like component , likes, ', state)
    // console.log('inside like component , post', posts[postId2])

    let postLikes = [];

    for(let i = 0; i < likes.length; i++) {
        if(likes[i].postId === posts[postId2].id) {
            postLikes.push(likes[i])
        }
    }

    // console.log('inside like component , post likes', postLikes)


    // const postLikes = likes.filter( l => {
    //     if(l.userId === postId) return l
    // })

    // console.log('inside like component , likes, 22', postLikes)

    // const addLikeEvent = (e) => {
    //     e.preventDefault();
    //     if (sessionUser) {
    //         dispatch(addLikeToPostThunk(postId2))
    //     }
    // }
    // const deleteLikeEvent = (e) => {
    //     e.preventDefault();
    //     if (sessionUser) {
    //         dispatch(deleteOneLikeThunk(song.id, sessionUser.id))
    //     }
    // }

    return (
        <div>
            <h2>like component</h2>
            {/* <button onClick={addLikeEvent} >add like</button> */}
            {postLikes.length}
            {<LikeBtn postId={postId2}/>}
        </div>
    )


}

export default LikeComponent
