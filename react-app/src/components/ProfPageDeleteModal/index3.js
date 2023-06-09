import OpenModalButton from "../OpenModalButton";
import Board from "../MineSweeper/Board";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";

function ProfileDeleteModal3({profileId}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();


    return (
        <div className="delete-profile-div">
            <h1 className="modalText">Are you sure?</h1>
            <form>
                <OpenModalButton buttonText={"Yes, delete my profile"} className="confirm-profile-delete2" modalComponent={<Board profileId={profileId}/>}/>
                {/* <button className="confirm-profile-delete" type="submit">Yes, delete my profile</button> */}
                <button className="decline-profile-delete" onClick={closeModal}>No, keep my profile</button>
            </form>
        </div>
    )
}

export default ProfileDeleteModal3;
