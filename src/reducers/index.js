import loggedReducer from "./isLogged";
import {combineReducers} from "redux";
import profileReducer from "./Profile";
import profilesListReducer from "./ProfilesList";
import agreementsListReducer from "./AgreementsList";
import agreementReducer from "./Agreement";
import AgreementItemsListReducer from "./AgreementItemsList";
import tasksReducer from "./Tasks";
import SearchReducer from "./Search";
import isTaskPageReducer from "./isTasksPage";
import allClientsListReducer from "./allClientsList";
import isAllClientsPageReducer from "./isAllClientsPage";

const allReducers =  combineReducers({
    isLogged: loggedReducer,
    selectedProfile: profileReducer,
    foundProfilesList: profilesListReducer,
    openContractsList: agreementsListReducer,
    agreement: agreementReducer,
    agreementItemsList: AgreementItemsListReducer,
    tasksList: tasksReducer,
    search: SearchReducer,
    allClientsList: allClientsListReducer,


    // PAGES
    isTaskPageOpen: isTaskPageReducer,
    isClientsPageOpen: isAllClientsPageReducer,
});

export default allReducers