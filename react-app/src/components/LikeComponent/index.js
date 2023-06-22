import { useDispatch, useSelector } from "react-redux";
import { addLikeToPostThunk, getOnePostThunk } from "../../store/posts";
import { useEffect } from "react";
import { getAllLikeThunk } from "../../store/like";
import LikeBtn from "./likeBtn";
import "./LikeComponent.css";

function LikeComponent({ postId2, sessionUser }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLikeThunk());
    dispatch(getOnePostThunk(postId2));
  }, [dispatch, postId2]);

  const likes = useSelector((state) => Object.values(state.likes));
  const posts = useSelector((state) => state.posts);

  let postLikes = [];

  for (let i = 0; i < likes.length; i++) {
    if (likes[i].postId === posts[postId2].id) {
      postLikes.push(likes[i]);
    }
  }

  return (
    <div id="likeC">
      likes: {postLikes.length}
      {<LikeBtn postId={postId2} />}
    </div>
  );
}

export default LikeComponent;
