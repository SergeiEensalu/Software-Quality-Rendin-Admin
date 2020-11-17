const SearchReducer = (state = '', action) => {
    switch (action.type) {
        case 'ADD_SEACRH':
            return action.search;
        case 'CLEAN_SEARCH':
            return '';
        default:
            return state;
    }
};

export default SearchReducer;