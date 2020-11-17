const initialState = [];


const agreementsListReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_AGREEMENTS_TO_OPEN_AGREEMENTS_LIST':
            if (!state.includes(action.agreement)) {
                return [...state, action.agreement];
            } else {
                return state
            }
        case 'CLEAN_ALL_AGREEMENTS_FROM_OPEN_AGREEMENTS_LIST':
            return [];
        case 'DELETE_CONTRACT_FROM_LIST':
            return state.filter(item => item !== action.contract);
        case 'UPDATE_ALL_AGREEMENTS_IN_OPEN_AGREEMENTS_LIST':
            const updatedContract = [];
            Object.keys(state).forEach(function (key) {
                if (state[key].id === action.agreement.id) {
                    updatedContract.push(action.agreement);
                } else {
                    updatedContract.push(state[key]);
                }
            });
            return updatedContract;
        default:
            return state;
    }
};

export default agreementsListReducer;
