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

import "./PostPageAll.css";
import PostPageEditFormModal from "../PostPageEditFormModal";
import { createCommentThunk, getAllCommentsThunk } from "../../store/comment";

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

  const buttonRef = useRef();

  console.log('all post page button ref reference:' , buttonRef)

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
    dispatch(getAllCommentsThunk());
}, [dispatch]);

  const posts = useSelector((state) => Object.values(state.posts));
  const users = useSelector((state) => Object.values(state.users));
  const profiles = useSelector((state) => Object.values(state.profiles));
  const comments = useSelector((state) => Object.values(state.comments));

  if (posts.length < 1) return <h1>where have all the posts gone?</h1>;

  // console.log('inside all posts, info for sort', users)

  let sortedPosts = posts.sort(
      (a, b) =>
      new Date(...b.createdAt.split("/").reverse()) -
      new Date(...a.createdAt.split("/").reverse())
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
                <div className="textContent">{textContent}</div>
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
              <div className="butnBox">
                <button
                  id={`dentification ${id}`}
                  ref={buttonRef}
                  onClick={(e) => {
                    e.stopPropagation()
                    console.log('in the on click ....===>', buttonRef)
                    if (e.target.id === buttonRef.current.id && propD === "hidden") {
                      setPropD("postManip2");
                    } else {
                      setPropD("hidden");
                    }
                  }}
                >
                  {propD === "hidden" ? (
                    <div className="arrowBox">
                      <img
                        className="arrowimg"
                        src="https://i.imgur.com/vFVA9hw.jpg"
                      ></img>
                      <h5>comments</h5>
                      <img
                        className="arrowimg"
                        src="https://i.imgur.com/vFVA9hw.jpg"
                      ></img>
                    </div>
                  ) : (
                    <div className="arrowBox">
                      <img
                        className="arrowimg"
                        src="https://i.imgur.com/Kt3ecC6.jpg"
                      ></img>
                      <h5>hide comments</h5>
                      <img
                        className="arrowimg"
                        src="https://i.imgur.com/Kt3ecC6.jpg"
                      ></img>
                    </div>
                  )}
                </button>
              </div>
              <div id={propD}>
                {sessionUser && (
                  <div id="commentDiv">
                    <form
                      onSubmit={(e) => handleSubmit2(e, id)}
                      encType="multipart/form-data"
                      id="newPostForm"
                    >
                      <div className="form-comment text-input">
                        <div>
                          <label for="name"></label>
                        </div>
                        <textarea
                          className="textB"
                          placeholder="What's on you mind?"
                          type="textArea"
                          name="textContent"
                          onChange={(e) => setTextContent2(e.target.value)}
                          value={textContent2}
                          required={true}
                          maxLength={500}
                        ></textarea>
                      </div>
                      <div className="four">
                        <button className="confirm-submit" type="submit">
                          Create Comment
                        </button>
                      </div>
                    </form>
                  </div>
                )}
                {comments
                  ?.filter((co) => {
                    if (co.postId === id) {
                      return co;
                    }
                  })
                  .map((c) => (
                    <div className="commentSection" key={c.id}>
                      <div>
                        {" "}
                        {users[c.userId - 1]?.username} says: {c.textContent}
                      </div>
                      <div className="EDbtn">
                        {sessionUser && sessionUser.id === c.userId && (
                          <OpenModalButton
                            className="delComBtn2"
                            buttonText="Edit Comment"
                            modalComponent={<CommentEditModal c={c} />}
                          />
                        )}
                        {sessionUser && sessionUser.id === c.userId && (
                          <OpenModalButton
                            className="delComBtn2"
                            buttonText="Delete Comment"
                            modalComponent={
                              <CommentDeleteModal commentId={c.id} />
                            }
                          />
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllPosts;
