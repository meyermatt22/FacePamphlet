import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"
import { getAllProfilesThunk } from "../../store/profiles";
import { NavLink, useHistory } from "react-router-dom";
import './ProfPageAll.css'


function AllProfiles() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const [query, setQuery] = useState('');

    useEffect(() => {
        dispatch(getAllProfilesThunk())
    }, [dispatch]);

    const profiles = useSelector(state => Object.values(state.profiles))
    let userProf = ''

    for(let i = 0; i < profiles.length; i++) {
        if (profiles && profiles[i].userId === parseInt(sessionUser.id)) {
            userProf = profiles[i]
        }
    }

    let profileId = userProf.id

    if (profileId === null) {
        profileId = 'new'
    }

    return (
        <div id="allProfPage">
            <div id="allProfInfo">
                {userProf && (
                    <button className="profile-curr-btn" onClick={() => history.push(`/profiles/${userProf.id}`)}>My Profile</button>
                    )}
                {!userProf && (
                    <button className="profile-curr-btn" onClick={() => history.push(`/profiles/new`)}>Create a Profile</button>
                )}
                <input id="searchBar" placeholder="Find People (firstname & lastname)" onChange={event => setQuery(event.target.value)} />
            {profiles?.filter(prof => {
                if (query === '') {
                    return prof
                } else if (prof.firstName.toLowerCase().includes(query.toLocaleLowerCase())) {
                    return prof
                } else if (prof.lastName.toLowerCase().includes(query.toLocaleLowerCase())) {
                    return prof
                }
            }).map(({ firstName, lastName, middleName, profPic, dateOfBirth, backgroundPic, id, bio }) => (

                <NavLink to={`/profiles/${id}`} key={id} className="profDiv">
                    <div className="picDiv">
                        <img className="profPic" src={profPic}></img>
                    </div>
                    <div className="profInfo">
                    <h2>
                        {firstName} {middleName} {lastName}
                    </h2>
                    <div className="bioText">
                    <h5 >
                        {bio}
                    </h5>

                    </div>
                    </div>
                </NavLink>
            ))}
            </div >
        </div>
    )
}

export default AllProfiles;
