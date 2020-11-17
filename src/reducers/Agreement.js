const agreementReducer = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_AGREEMENT':
            return action.agreements;
        default:
            return state;
    }
};

export default agreementReducer;
