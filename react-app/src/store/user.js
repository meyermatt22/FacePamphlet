const GET_ALL_USERS = 'users/GET_ALL_USERS';

const getAllUsersAction = (users) => ({
    type: GET_ALL_USERS,
    users
});

export const getAllUsersThunk = () => async (dispatch) => {
    const res = await fetch("/api/users");

    if(res.ok) {
        const { users } = await res.json();
        dispatch(getAllUsersAction(users))
        return users
    } else {
        return "==========> getAllUsersThunk res is not ok <=========="
    }
};

const initState = {};
function userReducer(state = initState, action) {
    let newState;
    switch (action.type) {
        case GET_ALL_USERS:
            newState = {...state};
            action.users.forEach((user) => {
                newState[user.id] = user
            });
            return newState;
        default:
            return state;
    };
};

export default userReducer;
