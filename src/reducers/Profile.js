const profileReducer = (state = "", action) => {
    switch (action.type) {
        case 'ADD_PROFILE':
            return action.profile;
        case 'UPDATE_PROFILE_DATA':
            return action.profile;
        case 'CLEAR_PROFILE_DATA':
            return "";
        default:
            return state;
    }
};

export default profileReducer;
