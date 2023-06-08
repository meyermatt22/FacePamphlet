import { useDispatch, useSelector } from "react-redux";
import { deleteLikeThunk, getCurrentUsersLikesThunk } from "../../store/like";
import { useEffect } from "react";
import { addLikeToPostThunk, getOnePostThunk } from "../../store/posts";


function LikeBtn({postId}) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getCurrentUsersLikesThunk())
        dispatch(getOnePostThunk(postId))
    }, [dispatch, postId])

    const likes = useSelector((state) => Object.values(state.likes))
    const posts = useSelector(state => state.posts)

    let userLikes = [];

    for(let i = 0; i < likes.length; i++) {
        if(likes[i].userId === sessionUser.id) {
            userLikes.push(likes[i])
        }
    }
    let clickable = true
    let likeId = ''
    for(let i = 0; i < userLikes.length; i++) {
        if(userLikes[i].postId === postId) {
            clickable = false
            likeId = userLikes[i].id
        }
    }

    useEffect(() => {
        if(posts[postId].userId === sessionUser.id) clickable = false
    }, [dispatch, postId])

    const addLikeEvent = (e) => {
        e.preventDefault();
        if (sessionUser) {
            dispatch(addLikeToPostThunk(postId))
            clickable = false
        }
    }

    const removeLikeEvent = (e) => {
        e.preventDefault();
        if(sessionUser) {
            dispatch(deleteLikeThunk(likeId))
            clickable = true
        }
    }


    return (
        <div>
            <div>{clickable ? <img className="likeImage" onClick={addLikeEvent} src="https://i.imgur.com/GfdH3b9.png"></img> : <img className="likeImage" src="https://i.imgur.com/dAFepWp.png" onClick={removeLikeEvent}></img>}</div>
        </div>
    )
}

export default LikeBtn
