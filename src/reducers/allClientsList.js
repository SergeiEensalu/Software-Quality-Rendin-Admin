const allClientsListReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_CLIENTS_TO_LIST':
            return action.clients;
        case 'REMOVE_CLIENTS_FROM_LIST':
            return [];
        default:
            return state;
    }
};

export default allClientsListReducer;
