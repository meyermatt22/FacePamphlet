import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"
import { getCurrProfThunk } from "../../store/profiles";
import { useParams } from "react-router-dom";


function ProfPageCurr() {
    const dispatch = useDispatch();

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
    console.log(userProf)

    if(!userProf) {
        return 'no profile found for user'
    }

    return (
        <div>
            <h1>current users prof page</h1>
            {userProf?.firstName}
            <img src={userProf?.profPic}></img>
        </div>
    )
}

export default ProfPageCurr;
