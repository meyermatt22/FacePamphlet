import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"
import { getAllProfilesThunk } from "../../store/profiles";
import { NavLink, useHistory } from "react-router-dom";
import './ProfPageAll.css'


function AllProfiles() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [query, setQuery] = useState('');

    useEffect(() => {
        dispatch(getAllProfilesThunk())
    }, [dispatch]);

    const profiles = useSelector(state => Object.values(state.profiles))

    return (
        <div id="allProfPage">
            <div id="allProfInfo">
                <button className="profile-curr-btn" onClick={() => history.push(`/profiles/current`)}>My Profile</button>
                    <h1>all profiles page</h1>
                <input id="searchBar" placeholder="Find People (firstname & lastname)" onChange={event => setQuery(event.target.value)} />
            </div>
            <div>

            </div>
            {profiles?.filter(prof => {
                if (query === '') {
                    return prof
                } else if (prof.firstName.toLowerCase().includes(query.toLocaleLowerCase())) {
                    return prof
                } else if (prof.lastName.toLowerCase().includes(query.toLocaleLowerCase())) {
                    return prof
                }
            }).map(({ firstName, lastName, middleName, profPic, dateOfBirth, backgroundPic, id }) => (
                <NavLink to={`/profiles/${id}`} key={id} className="profDiv">
                    <div>
                        {firstName} {middleName} {lastName}. Born on {dateOfBirth}
                    </div>
                    <div>
                    </div>
                    <div className="picDiv">
                        <img className="profPic" src={profPic}></img>
                        {/* <img className="backgroundPic" src={backgroundPic}></img> */}
                    </div>
                </NavLink>
            ))}
        </div>
    )
}

export default AllProfiles;
