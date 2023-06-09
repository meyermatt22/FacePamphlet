import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteProfileThunk } from "../../store/profiles";
import './ProfPageDeleteModal.css'
import OpenModalButton from "../OpenModalButton";
import TTTModal from "../TTTModal";

function ProfileDeleteModal({profileId}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    // const handleDelete = async (e) => {
    //     e.preventDefault()

    //     const deletedProfile = await dispatch(deleteProfileThunk(profileId))

    //     if (deletedProfile.message === 'delete successful') {
    //         history.push("/profiles/current");
    //         closeModal();
    //       };
    // }

    return (
        <div className="delete-profile-div">
            <h1 className="modalText">Are you sure?</h1>
            <form>
                <OpenModalButton buttonText={"Yes, delete my profile"} className="confirm-profile-delete2" modalComponent={<TTTModal profileId={profileId}/>}/>
                {/* <button className="confirm-profile-delete" type="submit">Yes, delete my profile</button> */}
                <button className="decline-profile-delete" onClick={closeModal}>No, keep my profile</button>
            </form>
        </div>
    )
}

export default ProfileDeleteModal;
