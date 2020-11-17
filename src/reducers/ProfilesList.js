const profilesListReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_PROFILES_LIST':
            return action.profiles;
        case 'CLEAR_PROFILES_LIST':
            return [];
        default:
            return state;
    }
};

export default profilesListReducer;
