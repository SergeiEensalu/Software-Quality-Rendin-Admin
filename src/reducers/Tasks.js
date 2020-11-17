const tasksReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TASKS_TO_LIST':
            return action.tasks;
        case 'CLEAR_TASKS_FROM_LIST':
            return [];
        case 'DELETE_TASK_FROM_LIST':
            return state.filter(item => item.id !== action.id);
        default:
            return state;
    }
};

export default tasksReducer;
