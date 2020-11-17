import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import React from "react";
import SideNav, {NavIcon, NavItem, NavText} from '@trendmicro/react-sidenav';
import contracts_img from "./pictures/contracts_img.jpg";
import close_button_search from "./pictures/close_button_search.png";
import task_flow from "./pictures/task_flow.png";
import profiles from "./pictures/profiles.png";
import {useDispatch, useSelector} from "react-redux";
import {
    ADD_CLIENTS_TO_LIST,
    ADD_TASKS_TO_LIST,
    CLEAN_ALL_AGREEMENTS_FROM_AGREEMENTS_LIST,
    CLEAR_PROFILE_DATA,
    CLEAR_PROFILES_LIST,
    CLEAR_TASKS_FROM_LIST,
    clearAllAgreementFromOpenList,
    CLOSE_ALL_CLIENTS_PAGE,
    CLOSE_TASK_PAGE,
    OPEN_ALL_CLIENTS_PAGE,
    OPEN_TASK_PAGE,
    REMOVE_CLIENTS_FROM_LIST
} from "../actions";
import {findCollection, findFullCollection} from "./Functions";


function SideBar() {

    const style = {
        backgroundColor: "black",
        textAlign: "right",
        position: "fixed",
        left: "0",
        bottom: "0",
        height: "100%",
        color: "white"
    };

    const openContrats = useSelector(state => state.openContractsList);
    const dispatch = useDispatch();

    function closeContracts() {
        dispatch(clearAllAgreementFromOpenList())
    }

    async function findTasks() {
        clearSearcing();
        const tasks = await findCollection("tasks", "closed","==", null);
        if (tasks) {
            dispatch(ADD_TASKS_TO_LIST(tasks));
        }
        dispatch(OPEN_TASK_PAGE())
    }

    async function findAllProfiles() {
        clearSearcing();
        const profiles = await findFullCollection("profiles");
        dispatch(ADD_CLIENTS_TO_LIST(profiles));
        dispatch(OPEN_ALL_CLIENTS_PAGE());
    }

    function clearSearcing() {
        dispatch(CLOSE_TASK_PAGE());
        dispatch(CLEAR_PROFILE_DATA());
        dispatch(CLEAR_PROFILES_LIST());
        dispatch(CLEAN_ALL_AGREEMENTS_FROM_AGREEMENTS_LIST());
        dispatch(CLEAR_TASKS_FROM_LIST());
        dispatch(clearAllAgreementFromOpenList());
        dispatch(REMOVE_CLIENTS_FROM_LIST());
        dispatch(CLOSE_ALL_CLIENTS_PAGE());
    }

    return (
        <SideNav style={style} className="bg-dark">
            <SideNav.Toggle/>
            <SideNav.Nav>
                {(openContrats.length > 0) &&
                <NavItem onClick={closeContracts}>
                    <NavIcon>
                        <img className="fa fa-fw fa-home" width={50} height={50}
                             src={contracts_img}
                             alt="logo"/>
                    </NavIcon>
                    <NavText>
                        <h5 className="text-white">Close contracts</h5>
                    </NavText>
                </NavItem>}
                <NavItem onClick={clearSearcing}>
                    <NavIcon>
                        <img className="fa fa-fw fa-home" width={30} height={30}
                             src={close_button_search}
                             alt="logo"/>
                    </NavIcon>
                    <NavText>
                        Clear search
                    </NavText>
                </NavItem>
                <NavItem>
                    <NavIcon onClick={findTasks}>
                        <img className="fa fa-fw fa-home" width={30} height={30}
                             src={task_flow}
                             alt="logo"/>
                    </NavIcon>
                    <NavText>
                        Task
                    </NavText>
                </NavItem>
                <NavItem>
                    <NavIcon onClick={findAllProfiles}>
                        <img className="fa fa-fw fa-home" width={30} height={30}
                             src={profiles}
                             alt="logo"/>
                    </NavIcon>
                    <NavText>
                        Profiles
                    </NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
    )
}

export default SideBar
