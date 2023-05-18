import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"
import { getOneProfileThunk, getAllProfilesThunk } from "../../store/profiles";
import { useHistory, useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import ProfileDeleteModal from "../ProfPageDeleteModal";
// import './ProfPageCurr.css'

function ProfPageSingle() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams()

    useEffect(() => {
        dispatch(getOneProfileThunk(id))
    }, [dispatch, id]);

    const profiles = useSelector(state => state.profiles)
    const sessionUser = useSelector(state => state.session.user);

    if(profiles.length < 1) return null

    // console.log('session number type ', sessionUser.id, id, parseInt(id) === parseInt(sessionUser.id))

    return (
        <div id="profPageSingle">
            <div id="backimgCont">
                <img id="backimg" src={profiles[id]?.backgroundPic}></img>
            </div>
        <div>
            <img id="profimg" src={profiles[id]?.profPic}></img>
        </div>
        <div id="filler">

        </div>
            <h1>{profiles[id]?.firstName}'s prof page</h1>
            {profiles[id]?.firstName} {profiles[id]?.middleName} {profiles[id]?.lastName}
            <div>{profiles[id]?.bio}</div>
            {sessionUser && sessionUser.id === parseInt(id) && (
                <button className="profile-edit-btn" onClick={() => history.push(`/profiles/edit/${sessionUser.id}`)}>Edit Profile</button>
            )}
            {sessionUser && sessionUser.id === parseInt(id) && (
                <OpenModalButton buttonClass="song-del-btn" buttonText="Delete Profile" modalComponent={<ProfileDeleteModal profileId={id}/>}/>
            )}
        </div>
    )
}

export default ProfPageSingle;
