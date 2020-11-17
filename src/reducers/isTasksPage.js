const isTaskPageReducer = (state = false, action) => {
    switch (action.type) {
        case 'OPEN_TASK_PAGE':
            return true;
        case 'CLOSE_TASK_PAGE':
            return false;
        default:
            return state;
    }
};

export default isTaskPageReducer;
