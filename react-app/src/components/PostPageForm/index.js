import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPostThunk } from "../../store/posts";

function PostPageForm() {
    const dispatch = useDispatch();
    const history = useHistory();

    // const current = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(Date.now())

    // console.log('this current thing on the post page form', current)
    // console.log(new Intl.DateTimeFormat('en-US',
        // {year: 'numeric',
        // month: '2-digit',
        // day: '2-digit',
        // hour: '2-digit',
        // minute: '2-digit',
        // second: '2-digit'}).format(Date.now()));

    const [textContent, setTextContent] = useState('');
    // const [createdAt, setCreatedAt] = useState(current);
    // const [updatedAt, setUpdatedAt] = useState(current);

    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('in the handle submit ==> ')

        setHasSubmitted(true);
        if(validationErrors.length) return alert('Your Post has errors, cannot submit!');

        const formData = new FormData();
        formData.append('text_content', textContent);

        // formData.append('created_at', createdAt);
        // formData.append('updated_at', updatedAt);

        const newPost = await dispatch(createPostThunk(formData));

        setTextContent('');
        // setCreatedAt('');
        // setUpdatedAt('');

        history.push(`/posts/${newPost.id}`)
    };

    useEffect(() => {
        const errors = [];

        if (!textContent) errors.push('Please provide something!')
        setValidationErrors(errors)
    }, [ textContent ]);

    return (
        <div id="postDiv">
            <h1>Create a new post!</h1>
            {hasSubmitted && validationErrors.length > 0 && (
                <div>
                    <h2>The following errors were found:</h2>
                    <ul>
                        {validationErrors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
            <form
                onSubmit={(e) => handleSubmit(e)}
                encType="multipart/form-data"
                id="newPostForm"
            >
                <div className="form-input-box text-input">
                    <div><label for="name">share here:</label></div>
                    <input
                        type="textArea"
                        name="textContent"
                        onChange={(e) => setTextContent(e.target.value)}
                        value={textContent}
                        required={true}
                        >
                    </input>
                </div>
                <div className="four">
                    <button className="confirm-submit" type="submit">Create Profile</button>
                </div>
            </form>
        </div>
    )
};

export default PostPageForm;
