const initialState =  (JSON.parse(localStorage.getItem("isAuth")) === true);

const loggedReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return true;
        case 'SING_OUT':
            return false;
        default:
            return state;
    }
};

export default loggedReducer;