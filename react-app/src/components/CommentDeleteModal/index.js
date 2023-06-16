import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteCommentThunk } from "../../store/comment";
import './CommentDeleteModal.css'

function CommentDeleteModal({commentId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = async (e) => {
        e.preventDefault()

        await dispatch(deleteCommentThunk(commentId))

        closeModal();
    };

    return (
        <div className="delete-comment-div">
            <h1 className="modalText">Delete Your Comment?</h1>
            <form onSubmit={handleDelete} className="subButtons">
                <button className="confirm-comment-delete" type="submit">Yes, delete my comment</button>
                <button className="decline-comment-delete" onClick={closeModal}>No, keep my comment</button>
            </form>
        </div>
    )
};

export default CommentDeleteModal;
