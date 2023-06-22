import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"
import { getCurrProfThunk } from "../../store/profiles";
import { useHistory, useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import ProfileDeleteModal from "../ProfPageDeleteModal";
import './ProfPageCurr.css'
import { getAllPostsThunk } from "../../store/posts";

function ProfPageCurr() {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getCurrProfThunk())
        dispatch(getAllPostsThunk())
    }, [dispatch])
    const sessionUser = useSelector(state => state.session.user);
    const profiles = useSelector(state => Object.values(state.profiles))
    const posts = useSelector(state => Object.values(state.posts));


    let userProf = ''
    let userPosts = []

    for(let i = 0; i < profiles.length; i++) {
        if (profiles && profiles[i].userId === parseInt(sessionUser.id)) {
            userProf = profiles[i]
        }
    }

    for(let i = 0; i < posts.length; i++) {
        if (posts[i].userId === parseInt(sessionUser.id)) {
            userPosts.push(posts[i])
        }
    }

    let sortedPosts = userPosts.sort((a,b) => new Date(...b.createdAt.split('/').reverse()) - new Date(...a.createdAt.split('/').reverse()))

    
    if(!userProf && sessionUser) {
        return (
            <div id="noProfPage">
                <button className="profile-new-btn" onClick={() => history.push(`/profiles/new`)}>Make Your Profile</button>
            </div>
        )
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
            <div id="profInfo">
                <h1>{userProf?.firstName}'s prof page</h1>
                {userProf?.firstName} {userProf?.middleName} {userProf?.lastName}
                <div>{userProf?.bio}</div>
                <div id="userPosts">
                {sortedPosts?.map(({textContent, id, createdAt}) => (
                    <div className="userPost" key={id}>
                        {textContent}
                        <div className="postDate">posted at {new Date(createdAt).toLocaleTimeString('en-US')} on: {new Date(createdAt).toLocaleDateString()}</div>
                    </div>
                ))}
                </div>
            {sessionUser && (
                <button className="profile-edit-btn" onClick={() => history.push(`/profiles/edit/${sessionUser.id}`)}>Edit Profile</button>
                )}
            {sessionUser && (
                <OpenModalButton buttonClass="song-del-btn" buttonText="Delete Profile" modalComponent={<ProfileDeleteModal profileId={userProf.id}/>}/>
                )}
            </div>
        </div>
    )
}

export default ProfPageCurr;
