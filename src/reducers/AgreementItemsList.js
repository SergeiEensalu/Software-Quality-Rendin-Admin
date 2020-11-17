const initialState = {
    tenantList: [],
    landlordList: [],
    creatorList: []
};


const AgreementItemsListReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_AGREEMENTS_TO_TENANT_LIST':
            return {
                ...state,
                tenantList: action.agreements
            };
        case 'ADD_AGREEMENTS_TO_LANDLORD_LIST':
            return {
                ...state,
                landlordList: action.agreements
            };
        case 'ADD_AGREEMENTS_TO_CREATOR_LIST':
            return {
                ...state,
                creatorList: action.agreements
            };
        case 'CLEAN_ALL_AGREEMENTS_FROM_AGREEMENTS_LIST':
            return {
                ...state,
                tenantList: [],
                landlordList: [],
                creatorList: []
            };
        case 'UPDATE_AGREEMENT_IN_ALL_AGREEMENT_LIST':
            const newState = {
                tenantList: [],
                landlordList: [],
                creatorList: []
            };
            Object.keys(state).forEach(function (key) {
                const list = [];
                Object.keys(state[key]).forEach(function (index) {
                    if (state[key][index].id === action.agreement.id) {
                        list.push(action.agreement);
                    } else {
                        list.push(state[key][index]);
                    }
                });
                newState[key] = list;
            });
            return newState;
        default:
            return state;
    }
};

export default AgreementItemsListReducer;
