const isAllClientsPageReducer = (state = false, action) => {
    switch (action.type) {
        case 'OPEN_ALL_CLIENTS_PAGE':
            return true;
        case 'CLOSE_ALL_CLIENTS_PAGE':
            return false;
        default:
            return state;
    }
};

export default isAllClientsPageReducer;
