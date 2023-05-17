const GET_ALL_PROFILES = 'profiles/GET_ALL_PROFILES'

const getAllProfilesAction = (profiles) => ({
    type: GET_ALL_PROFILES,
    profiles
});

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

const initState = {};
function profileReducer(state = initState, action) {
    let newState;
    switch (action.type) {
        case GET_ALL_PROFILES:
            newState = {...state};
            action.profiles.forEach((prof) => {
                newState[prof.id] = prof
            })
            return newState;
        default:
            return state
    };
};

export default profileReducer;
