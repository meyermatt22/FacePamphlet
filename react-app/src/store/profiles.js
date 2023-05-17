const GET_ALL_PROFILES = 'profiles/GET_ALL_PROFILES'
const GET_CURR_USERS_PROFILE = 'profiles/GET_CURR_USERS_PROFILE'

const getAllProfilesAction = (profiles) => ({
    type: GET_ALL_PROFILES,
    profiles
});

const getCurrProfAction = (profile) => ({
    type: GET_CURR_USERS_PROFILE,
    profile
})

export const getAllProfilesThunk = () => async (dispatch) => {
    const res = await fetch("/api/profiles");
    console.log('inside allpof thunk : ', res)

    if(res.ok) {
        const { profiles } = await res.json();
        dispatch(getAllProfilesAction(profiles))
        return profiles
    } else {
        return "==========> getAllProfilesThunk res is not ok <=========="
    }
};

export const getCurrProfThunk = () => async (dispatch) => {
    const res = await fetch('/api/profiles/current')

    if(res.ok) {
        const profile  = await res.json()
        console.log('getcurrprofthunk profile is right here ==>', profile)
        dispatch(getCurrProfAction(profile))
        return profile
    } else {
        return "==========> getCurrProfThunk res is not ok <=========="
    }
}

const initState = {};
function profileReducer(state = initState, action) {
    let newState;
    switch (action.type) {
        case GET_ALL_PROFILES:
            newState = {...state};
            action.profiles.forEach((prof) => {
                newState[prof.id] = prof
            })
            return newState
        case GET_CURR_USERS_PROFILE:
            newState = {...state}
            console.log('========.> curr user reducer', action.profile.id)
            newState[action.profile.id] = action.profile
            // console.log('curr user reducer2', newState)
            return newState;
        default:
            return state
    };
};

export default profileReducer;
