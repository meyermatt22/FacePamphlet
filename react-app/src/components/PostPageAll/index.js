import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getAllPostsThunk } from "../../store/posts";
import { useHistory, NavLink } from "react-router-dom";
import { getAllUsersThunk } from "../../store/user";
import { getAllProfilesThunk } from "../../store/profiles";
import { createPostThunk } from "../../store/posts";
import OpenModalButton from "../OpenModalButton";
import PostDeleteModal from "../PostPageDeleteModal";
import CommentModal from "../CommentModal";
import CommentDeleteModal from "../CommentDeleteModal";
import CommentEditModal from "../CommentEditModal";
import PostComments from "../PostComments";

import "./PostPageAll.css";
import PostPageEditFormModal from "../PostPageEditFormModal";
import { createCommentThunk, getAllCommentsThunk } from "../../store/comment";
import LikeComponent from "../LikeComponent";


function AllPosts() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [query, setQuery] = useState("");
  const [textContent, setTextContent] = useState("");
  const [textContent2, setTextContent2] = useState("");
  const [propD, setPropD] = useState("hidden");
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [hasSubmitted2, setHasSubmitted2] = useState(false);

  // const buttonRef = useRef();

  // console.log('all post page button ref reference:' , buttonRef)

  // const handleTextContent = (e) => {
      //     if(textContent.length < 100) setTextContent(e.target.value)
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);
    if (validationErrors.length)
    return alert("Your Post has errors, cannot submit!");

    const formData = new FormData();
    formData.append("text_content", textContent);

    const newPost = await dispatch(createPostThunk(formData));

    setTextContent("");

    history.push(`/home`);
};

  const handleSubmit2 = async (e, id) => {
    e.preventDefault();

    setHasSubmitted2(true);

    const formData = new FormData();
    formData.append("text_content", textContent2);
    formData.append("post_id", id);

    await dispatch(createCommentThunk(formData));

    setTextContent2("");
    setHasSubmitted2(false);
};

// const handleClick = async (e) => {
  //     e.preventDefault();
  //     if(propD === "dropDown") {
      //         propD = "downDrop"
  //     } else {
      //         propD = "dropDown"
      //     }
  // }

  // console.log("handle click stuff, propD status", propD)

  useEffect(() => {
      const errors = [];
      if (!textContent) errors.push("Please provide something!");
    // if (!textContent2) errors.push('Please provide something!')
    setValidationErrors(errors);
}, [textContent]);

useEffect(() => {
    dispatch(getAllPostsThunk());
    dispatch(getAllUsersThunk());
    dispatch(getAllProfilesThunk());
    // dispatch(getAllCommentsThunk());
}, [dispatch]);

  const posts = useSelector((state) => Object.values(state.posts));
  const users = useSelector((state) => Object.values(state.users));
  const profiles = useSelector((state) => Object.values(state.profiles));
  // const comments = useSelector((state) => Object.values(state.comments));


  if (posts.length < 1) return <h1>where have all the posts gone?</h1>;

  // console.log('inside all posts, info for sort', posts)

  // let sortedPosts = posts.sort(
  //     (a, b) =>
  //     new Date(...b.createdAt.split("/").reverse()) -
  //     new Date(...a.createdAt.split("/").reverse())
  //     );
  let sortedPosts = posts.sort(
      (a, b) =>
      a.id -
      b.id
      );

      // console.log('all of the sorted posts, ,,, ', comments)

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
            <div>
              <label for="name"></label>
            </div>
            <textarea
              className="textA"
              placeholder="What's on you mind?"
              type="textArea"
              name="textContent"
              onChange={(e) => setTextContent(e.target.value)}
              value={textContent}
              required={true}
              maxLength={500}
              ></textarea>
          </div>
          <div className="four">
            <button className="confirm-submit" type="submit">
              Create Post
            </button>
          </div>
        </form>
      </div>
      <div id="allPosts">
        <div id="postArea">
          {sortedPosts?.map(({ textContent, id, createdAt, userId }) => (
              <div key={id} className="post">
              <div className="postBox" to={`/posts/${id}`} key={id}>
                <div className="createInfo">
                  <img
                    className="profImg"
                    src={profiles[userId - 1]?.profPic}
                    />
                  <div className="ciS">
                    <div className="pText">
                      Posted by: {users[userId - 1]?.username}
                    </div>
                    <div className="pText">
                      Posted at:{" "}
                      {new Date(createdAt).toLocaleTimeString("en-US")}, on:{" "}
                      {new Date(createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="textContent"><h2>{textContent}</h2></div>
              </div>
              <div id="postManip">
                {sessionUser && sessionUser.id === userId && (
                    <OpenModalButton
                    buttonClass="post-del-btn"
                    buttonText="Delete Post"
                    modalComponent={<PostDeleteModal postId={id} />}
                  />
                )}
                {sessionUser && sessionUser.id === userId && (
                  <OpenModalButton
                    buttonText="Edit Post"
                    modalComponent={<PostPageEditFormModal id={id} />}
                  />
                )}
              </div>
              <div>
                {<PostComments postId={id} users={users} profiles={profiles}/>}
              </div>
              <div>
                { <LikeComponent postId2={id} sessionUser={sessionUser} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllPosts;
