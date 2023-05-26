import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { editCommentThunk } from "../../store/comment";
import { useEffect, useState } from "react";

function CommentEditModal({ c }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [textContent, setTextContent] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        if(c) {
            setTextContent(c.textContent)
        }
    },[c?.textContent])

    const handleSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true);
        if(validationErrors.length) return alert('Your Post has errors, cannot submit!');

        const formData = new FormData();
        formData.append('text_content', textContent);

        await dispatch(editCommentThunk(formData, c.id));

        setTextContent('');
        setValidationErrors([]);
        setHasSubmitted(false);

        closeModal();
    }

    useEffect(() => {
        const errors = [];
        if (!textContent) errors.push('Please provide something!')
        setValidationErrors(errors)
    }, [ textContent ]);

    if(!c) {
        return <h1> no comment</h1>
    };

    return (
        <div>
            <h1>edit comment modal</h1>
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

export default CommentEditModal;
