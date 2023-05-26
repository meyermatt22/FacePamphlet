import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { createCommentThunk, getAllCommentsThunk } from "../../store/comment";
import OpenModalButton from "../OpenModalButton";
import CommentEditModal from "../CommentEditModal";
import CommentDeleteModal from "../CommentDeleteModal";
import "./PostComments.css";

function PostComments({ postId, users, profiles }) {
  const dispatch = useDispatch();
  //   const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [textContent, setTextContent] = useState("");
  const [display, setDisplay] = useState("hidden");
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    dispatch(getAllCommentsThunk());
  }, [dispatch]);

  const comments = useSelector((state) => Object.values(state.comments));



  const handleSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);

    const formData = new FormData();
    formData.append("text_content", textContent);
    formData.append("post_id", postId);

    await dispatch(createCommentThunk(formData));

    setTextContent("");
    setHasSubmitted(false);
  };

  useEffect(() => {
    const errors = [];
    if (!textContent) errors.push("Please provide something!");
    setValidationErrors(errors);
  }, [textContent]);

  return (
    <div className="butinPC">
      <button
        className="butinC"
        onClick={() => {
          if (display === "hidden") {
            setDisplay("postCommentDiv");
          } else {
            setDisplay("hidden");
          }
        }}
      >
        {display === "hidden" ? (
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
      <div className={display}>
        {sessionUser && (
          <div className="formArea">
            <form
              onSubmit={(e) => handleSubmit(e)}
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
                  onChange={(e) => setTextContent(e.target.value)}
                  value={textContent}
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
            if (co.postId === postId) {
              return co;
            }
          })
          .map((c) => (
            <div className="commentSection" key={c.id}>
              <div> posted by: {users[c.userId]?.username}; posted at:{" "} {new Date(c.createdAt).toLocaleTimeString("en-US")}, on:{" "}
                      {new Date(c.createdAt).toLocaleDateString()}; heres what they said:  {c.textContent}</div>
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
                    modalComponent={<CommentDeleteModal commentId={c.id} />}
                  />
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PostComments;
