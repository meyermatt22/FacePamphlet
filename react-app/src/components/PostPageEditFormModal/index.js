import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editPostThunk, getOnePostThunk } from "../../store/posts";
import { useModal } from "../../context/Modal";
import './PostPageEditFormModal.css'

function PostPageEditFormModal({ id }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const { closeModal } = useModal()


    useEffect(() => {
        dispatch(getOnePostThunk(id))
    }, [dispatch, id]);

    const post = useSelector(state => state.posts)


    const [textContent, setTextContent] = useState('');

    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);


    useEffect(() => {
        if(post[id]) {
            setTextContent(post[id].textContent)

        }
    }, [post[id]?.textContent]);


    const handleSubmit = async (e) => {
        e.preventDefault();


        setHasSubmitted(true);
        if(validationErrors.length) return alert('Your Post has errors, cannot submit!');

        const formData = new FormData();
        formData.append('text_content', textContent);


        const updatedPost = await dispatch(editPostThunk(formData, id));


        setTextContent(post[id]?.textContent);
      

        setValidationErrors([]);
        setHasSubmitted(false);

        closeModal()
        history.push(`/home`);
    };

    useEffect(() => {
        const errors = [];

        if (!textContent) errors.push('Please provide something!')
        setValidationErrors(errors)
    }, [ textContent ]);

    if(!post) {
        return <h1>hello</h1>
    };

    return (
        <div id="editPostForm1">
            <h1>Update your post</h1>
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
                id="editPostForm"
            >
                <div className="form-input-box text-input">
                    <div><label for="name"></label></div>
                    <textarea
                        id="updateIn"
                        type="text"
                        name="textContent"
                        onChange={(e) => setTextContent(e.target.value)}
                        value={textContent}
                        required={true}
                        maxLength={500}
                        >
                    </textarea>
                </div>
                <div className="four">
                    <button id="subBtn" className="confirm-submit" type="submit">Confirm Edit</button>
                </div>
            </form>
        </div>
    )
};

export default PostPageEditFormModal;
