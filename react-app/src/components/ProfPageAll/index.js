import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"
import { getAllProfilesThunk } from "../../store/profiles";
import './ProfPageAll.css'
import { useHistory } from "react-router-dom";


function AllProfiles() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [query, setQuery] = useState('');

    useEffect(() => {
        dispatch(getAllProfilesThunk())
    }, [dispatch]);

    const profiles = useSelector(state => Object.values(state.profiles))

    return (
        <div>
            <button className="profile-curr-btn" onClick={() => history.push(`/profiles/current`)}>My Profile</button>
            <h1>all profiles page</h1>
            <input id="searchBar" placeholder="Find People (firstname & lastname)" onChange={event => setQuery(event.target.value)} />
            {profiles?.filter(prof => {
                if (query === '') {
                    return prof
                } else if (prof.firstName.toLowerCase().includes(query.toLocaleLowerCase())) {
                    return prof
                } else if (prof.lastName.toLowerCase().includes(query.toLocaleLowerCase())) {
                    return prof
                }
            }).map(({ firstName, profPic}) => (
                <div>
                    {firstName}
                    <img src={profPic}></img>
                </div>
            ))}
        </div>
    )
}

export default AllProfiles;
