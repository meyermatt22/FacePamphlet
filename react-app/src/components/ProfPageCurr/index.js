import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"
import { getCurrProfThunk } from "../../store/profiles";
import { useHistory, useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import ProfileDeleteModal from "../ProfPageDeleteModal";
import './ProfPageCurr.css'

function ProfPageCurr() {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getCurrProfThunk())
    }, [dispatch])
    const sessionUser = useSelector(state => state.session.user);
    const profiles = useSelector(state => Object.values(state.profiles))

    // console.log("this should be the session user : ", sessionUser, profiles)

    let userProf = ''

    for(let i = 0; i < profiles.length; i++) {
        if (profiles && profiles[i].userId === parseInt(sessionUser.id)) {
            userProf = profiles[i]
        }
    }

    // const userProf = useSelector(state => state.profile)
    // console.log(userProf)
    if(!userProf && sessionUser) {
        return <button className="profile-new-btn" onClick={() => history.push(`/profiles/new`)}>Make Your Profile</button>
    }

    if(!userProf) {
        return 'no profile found for user'
    }

    return (
        <div id="profPageCurr">
            <div id="backimgCont">
                <img id="backimg" src={userProf?.backgroundPic}></img>
            </div>
            <div>
                <img id="profimg" src={userProf?.profPic}></img>
            </div>
            <div id="filler">

            </div>
            <h1>{userProf?.firstName}'s prof page</h1>
            {userProf?.firstName} {userProf?.middleName} {userProf?.lastName}
            <div>{userProf?.bio}</div>
            {sessionUser && (
                <button className="profile-edit-btn" onClick={() => history.push(`/profiles/edit/${sessionUser.id}`)}>Edit Profile</button>
            )}
            {sessionUser && (
                <OpenModalButton buttonClass="song-del-btn" buttonText="Delete Profile" modalComponent={<ProfileDeleteModal profileId={userProf.id}/>}/>
            )}
        </div>
    )
}

export default ProfPageCurr;
