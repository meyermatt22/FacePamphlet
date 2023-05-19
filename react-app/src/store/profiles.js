const GET_ALL_PROFILES = 'profiles/GET_ALL_PROFILES';
const GET_PROFILE = 'profiles/GET_PROFILE';
const GET_CURR_USERS_PROFILE = 'profiles/GET_CURR_USERS_PROFILE';
const CREATE_PROFILE = 'profiles/CREATE_PROFILE';
const EDIT_PROFILE = 'profiles/EDIT_PROFILE';
const DELETE_PROFILE = 'profiles/DELETE_PROFILE';

const getAllProfilesAction = (profiles) => ({
    type: GET_ALL_PROFILES,
    profiles
});

const getOneProfAction = (profile) => ({
    type: GET_PROFILE,
    profile,
});

const getCurrProfAction = (profile) => ({
    type: GET_CURR_USERS_PROFILE,
    profile
});

const createProfAction = (profile) => ({
    type: CREATE_PROFILE,
    profile
});

const editProfileAction = (profile) => ({
    type: EDIT_PROFILE,
    profile
});

const deleteProfileAction = (profileId) => ({
    type: DELETE_PROFILE,
    profileId,
});

export const getAllProfilesThunk = () => async (dispatch) => {
    const res = await fetch("/api/profiles");

    if(res.ok) {
        const { profiles } = await res.json();
        dispatch(getAllProfilesAction(profiles))
        return profiles
    } else {
        return "==========> getAllProfilesThunk res is not ok <=========="
    }
};

export const getOneProfileThunk = (profileId) => async (dispatch) => {
    const res = await fetch(`/api/profiles/${profileId}`);

    if (res.ok) {
        const profile = await res.json();
        dispatch(getOneProfAction(profile));
        return profile;
    } else {
        return "==========> getOneProfileThunk res is not ok <=========="
    }
}

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
};

export const createProfThunk = (profile) => async (dispatch) => {
    const res = await fetch('/api/profiles/new', {
        method: "POST",
        body: profile
    });

    if(res.ok) {
        const profile = await res.json();
        dispatch(createProfAction(profile));
        return profile
    } else {
        return "==========> createProfileThunk res is not ok <=========="
    }
};

export const editProfileThunk = (profile, id) => async (dispatch) => {

    const res = await fetch(`/api/profiles/edit/${id}`, {
        method: 'PUT',
        body: profile
    })

    if(res.ok) {
        const prof = await res.json()
        dispatch(editProfileAction(prof))
        return prof
    } else {
        return "==========> editProfileThunk res is not ok <=========="
    }
};

export const deleteProfileThunk = (profileId) => async (dispatch) => {
    const res = await fetch(`/api/profiles/delete/${profileId}`, {
        method: "DELETE",
    });

    if(res.ok) {
        dispatch(deleteProfileAction(profileId));
        return { 'message': 'delete successful' };
    } else {
        return "==========> deleteProfileThunk res is not ok <=========="
    };
};

const initState = {};
function profileReducer(state = initState, action) {
    let newState;
    switch (action.type) {
        case GET_ALL_PROFILES:
            newState = {...state};
            action.profiles.forEach((prof) => {
                newState[prof.id] = prof
            });
            return newState;
        case GET_PROFILE:
            newState = {...state};
            newState[action.profile.id] = action.profile;
            return newState;
        case GET_CURR_USERS_PROFILE:
            newState = {...state};
            newState[action.profile.id] = action.profile;
            return newState;
        case CREATE_PROFILE:
            newState = {...state};
            newState[action.profile.id] = action.profile;
            return newState;
        case EDIT_PROFILE:
            newState = {...state};
            newState[action.profile.id] = action.profile;
            return newState;
        case DELETE_PROFILE:
            newState = {...state};
            delete newState[action.profileId];
            return newState;
        default:
            return state;
    };
};

export default profileReducer;
