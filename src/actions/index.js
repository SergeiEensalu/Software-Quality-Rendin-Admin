export const SING_IN = () => {
    return {
        type: 'SIGN_IN'
    }
};

export const SING_OUT = () => {
    return {
        type: 'SING_OUT'
    }
};

export const ADD_PROFILE_DATA = (profile) => {
    return {
        type: 'ADD_PROFILE',
        profile
    }
};

export const CLEAR_PROFILE_DATA = () => {
    return {
        type: 'CLEAR_PROFILE_DATA'
    }
};

export const UPDATE_PROFILE_DATA = (profile) => {
    return {
        type: 'UPDATE_PROFILE_DATA',
        profile
    }
};

export const ADD_PROFILES_LIST = (profiles) => {
    return {
        type: 'ADD_PROFILES_LIST',
        profiles
    }
};

export const CLEAR_PROFILES_LIST = () => {
    return {
        type: 'CLEAR_PROFILES_LIST'
    }
};

export const ADD_AGREEMENT_TO_OPEN_LIST = (agreement) => {
    return {
        type: 'ADD_AGREEMENTS_TO_OPEN_AGREEMENTS_LIST',
        agreement
    }
};

export const clearAllAgreementFromOpenList = () => {
    return {
        type: 'CLEAN_ALL_AGREEMENTS_FROM_OPEN_AGREEMENTS_LIST',
    }
};

export const DELETE_CONTRACT_FROM_LIST = (contract) => {
    return {
        type: 'DELETE_CONTRACT_FROM_LIST',
        contract
    }
};

export const ADD_AGREEMENTS_TO_TENANT_LIST = (agreements) => {
    return {
        type: 'ADD_AGREEMENTS_TO_TENANT_LIST',
        agreements
    }
};

export const ADD_AGREEMENTS_TO_LANDLORD_LIST = (agreements) => {
    return {
        type: 'ADD_AGREEMENTS_TO_LANDLORD_LIST',
        agreements
    }
};

export const ADD_AGREEMENTS_TO_CREATOR_LIST = (agreements) => {
    return {
        type: 'ADD_AGREEMENTS_TO_CREATOR_LIST',
        agreements
    }
};

export const CLEAN_ALL_AGREEMENTS_FROM_AGREEMENTS_LIST = (agreements) => {
    return {
        type: 'CLEAN_ALL_AGREEMENTS_FROM_AGREEMENTS_LIST',
        agreements
    }
};

export const UPDATE_AGREEMENT_IN_ALL_AGREEMENT_LIST = (agreement) => {
    return {
        type: 'UPDATE_AGREEMENT_IN_ALL_AGREEMENT_LIST',
        agreement
    }
};

export const UPDATE_ALL_AGREEMENTS_IN_OPEN_AGREEMENTS_LIST = (agreement) => {
    return {
        type: 'UPDATE_ALL_AGREEMENTS_IN_OPEN_AGREEMENTS_LIST',
        agreement
    }
};

export const CLEAR_ALL_SERACH_DATA = () => {
    return {
        type: 'CLEAR_ALL_SERACH_DATA'
    }
};

export const ADD_TASKS_TO_LIST = (tasks) => {
    return {
        type: 'ADD_TASKS_TO_LIST',
        tasks
    }
};

export const CLEAR_TASKS_FROM_LIST = () => {
    return {
        type: 'CLEAR_TASKS_FROM_LIST'
    }
};

export const DELETE_TASK_FROM_LIST = (id) => {
    return {
        type: 'DELETE_TASK_FROM_LIST',
        id
    }
};

export const ADD_SEACRH = (search) => {
    return {
        type: 'ADD_SEACRH',
        search
    }
};

export const CLEAN_SEARCH = () => {
    return {
        type: 'CLEAN_SEARCH'
    }
};

export const OPEN_TASK_PAGE = () => {
    return {
        type: 'OPEN_TASK_PAGE'
    }
};

export const CLOSE_TASK_PAGE = () => {
    return {
        type: 'CLOSE_TASK_PAGE'
    }
};

export const OPEN_ALL_CLIENTS_PAGE = () => {
    return {
        type: 'OPEN_ALL_CLIENTS_PAGE'
    }
};

export const CLOSE_ALL_CLIENTS_PAGE = () => {
    return {
        type: 'CLOSE_ALL_CLIENTS_PAGE'
    }
};

export const ADD_CLIENTS_TO_LIST = (clients) => {
    return {
        type: 'ADD_CLIENTS_TO_LIST',
        clients
    }
};

export const REMOVE_CLIENTS_FROM_LIST = () => {
    return {
        type: 'REMOVE_CLIENTS_FROM_LIST'
    }
};