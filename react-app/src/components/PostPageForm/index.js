import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPostThunk } from "../../store/posts";

function PostPageForm() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [textContent, setTextContent] = useState('');
    const [createdAt, setCreatedAt] = useState(new Date());
    const [updatedAt, setUpdatedAt] = useState(new Date());

    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true);
        if(validationErrors.length) return alert('Your Post has errors, cannot submit!');

        const formData = new FormData();
        formData.append('text_content', textContent);
        formData.append('created_at', createdAt);
        formData.append('updated_at', updatedAt);

        const newPost = await dispatch(createPostThunk(formData));

        setTextContent('');
        setCreatedAt('');
        setUpdatedAt('');

        history.push(`/posts`)
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
            </form>
        </div>
    )
};

export default PostPageForm;
