import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOneProfileThunk } from "../../store/profiles";
import { useHistory, useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import ProfileDeleteModal from "../ProfPageDeleteModal";
import { getAllPostsThunk } from "../../store/posts";
import './ProfPageSingle.css'
import TTTModal from "../TTTModal";

function ProfPageSingle() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams()

    useEffect(() => {
        dispatch(getOneProfileThunk(id))
        dispatch(getAllPostsThunk())
    }, [dispatch, id]);

    const profiles = useSelector(state => state.profiles)
    const sessionUser = useSelector(state => state.session.user);
    const posts = useSelector(state => Object.values(state.posts));

    let userPosts = []
    let userProf = profiles

    for(let i = 0; i < posts.length; i++) {
        if (posts[i].userId === parseInt(id)) {
            userPosts.push(posts[i])
        }
    }
    // for(let i = 0; i < profiles.length; i++) {
    //     if (profiles[i].userId === parseInt(sessionUser.id)) {
    //         userProf = profiles[i]
    //     }
    // }

    console.log('inside single prof page', userProf)

    let sortedPosts = userPosts.sort((a,b) => new Date(...b.createdAt.split('/').reverse()) - new Date(...a.createdAt.split('/').reverse()))

    if(!userProf && sessionUser) {
        return (
            <div id="noProfPage">
                <button className="profile-new-btn" onClick={() => history.push(`/profiles/new`)}>Make Your Profile</button>
            </div>
        )
    }

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
            <div id="profInfo">
                <h1>{profiles[id]?.firstName}'s prof page</h1>
                {profiles[id]?.firstName} {profiles[id]?.middleName} {profiles[id]?.lastName}
                <div>{profiles[id]?.bio}</div>
                <div id="userPosts">
                {sortedPosts?.map(({textContent, id, createdAt}) => (
                    <div className="userPost" key={id}>
                        {textContent}
                        <div className="postDate">posted at {new Date(createdAt).toLocaleTimeString('en-US')} on: {new Date(createdAt).toLocaleDateString()}</div>
                    </div>
                ))}
                </div>
            {sessionUser && sessionUser.id === profiles[id]?.userId && (
                <button className="profile-edit-btn" onClick={() => history.push(`/profiles/edit/${sessionUser.id}`)}>Edit Profile</button>
                )}
            {sessionUser && sessionUser.id === profiles[id]?.userId && (
                <OpenModalButton buttonClass="song-del-btn" buttonText="Delete Profile" modalComponent={<ProfileDeleteModal profileId={id}/>}/>
                )}
            {sessionUser && sessionUser.id === profiles[id]?.userId && (
                <OpenModalButton buttonClass="song-del-btn" buttonText="TTT" modalComponent={<TTTModal />}/>
                )}
            </div>
        </div>
    )
}

export default ProfPageSingle;
