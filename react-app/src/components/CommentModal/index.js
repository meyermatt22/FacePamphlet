import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createCommentThunk } from "../../store/comment";
import { getOnePostThunk } from "../../store/posts";
import { useModal } from "../../context/Modal";

function CommentModal({postId}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const [textContent, setTextContent] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    // useEffect(() => {
    //     dispatch(getOnePostThunk(postId))
    // }, [dispatch, postId]);

    // const post = useSelector(state => state.posts)

    // console.log('inside comment model, heres the post', post)

    const handleSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true);
        if(validationErrors.length) return alert('Your Post has errors, cannot submit!');

        const formData = new FormData();
        formData.append('text_content', textContent);
        formData.append('post_id', postId);

        await dispatch(createCommentThunk(formData));

        setTextContent('');
        setValidationErrors([]);
        setHasSubmitted(false);

        closeModal();
    };

    useEffect(() => {
        const errors = [];

        if (!textContent) errors.push('Please provide something!')
        setValidationErrors(errors)
    }, [ textContent ]);

    // if(!comment) {
    //     return <h1>hello</h1>
    // };

    return (
        <div id="postDiv">
            <form
                onSubmit={(e) => handleSubmit(e)}
                encType="multipart/form-data"
                id="newPostForm"
                >
                <div className="form-input-box text-input">
                    <div><label for="name"></label></div>
                    <textarea
                    className="textA"
                        placeholder="What's on you mind?"
                        type="textArea"
                        name="textContent"
                        onChange={(e) => setTextContent(e.target.value)}
                        value={textContent}
                        required={true}
                        maxLength={500}
                        >
                    </textarea>
                </div>
                <div className="four">
                <button className="confirm-submit" type="submit">Create Comment</button>
                </div>
            </form>
        </div>
    )
};

export default CommentModal;
