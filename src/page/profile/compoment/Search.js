import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {
    ADD_AGREEMENT_TO_OPEN_LIST,
    ADD_AGREEMENTS_TO_CREATOR_LIST,
    ADD_AGREEMENTS_TO_LANDLORD_LIST,
    ADD_AGREEMENTS_TO_TENANT_LIST,
    ADD_PROFILE_DATA,
    ADD_PROFILES_LIST,
    ADD_SEACRH,
    CLEAN_ALL_AGREEMENTS_FROM_AGREEMENTS_LIST,
    CLEAN_SEARCH,
    CLEAR_PROFILE_DATA,
    CLEAR_PROFILES_LIST,
    CLEAR_TASKS_FROM_LIST,
    clearAllAgreementFromOpenList, CLOSE_ALL_CLIENTS_PAGE, CLOSE_TASK_PAGE, REMOVE_CLIENTS_FROM_LIST
} from "../../../actions";
import {connect} from "react-redux";
import * as Translations from "../../../utils/Translation";
import {findCollection, isNumber} from "../../../utils/Functions";

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchData: '',
            realSearch: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.findContractById = this.findContractById.bind(this);
        this.findProfile = this.findProfile.bind(this);
        this.cleanSearchBar = this.cleanSearchBar.bind(this);
        this.search = this.search.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }


    async findContractById(searchValue, profileId) {
        if (profileId) {
            const userContracts = await findCollection('agreements', searchValue, "==", profileId);

            if (userContracts || userContracts.length >= 0) {
                let newContractList = [];

                await Promise.resolve(userContracts).then(promise => {
                    for (const array of promise) {
                        newContractList.push(array)
                    }
                    if (searchValue === "landlordProfileId") {
                        this.props.ADD_AGREEMENTS_TO_LANDLORD_LIST(newContractList);
                    } else if (searchValue === "tenantProfileId") {
                        this.props.ADD_AGREEMENTS_TO_TENANT_LIST(newContractList);
                    } else if (searchValue === "creatorProfileId") {
                        this.props.ADD_AGREEMENTS_TO_CREATOR_LIST(newContractList);
                    }
                });
            }
        } else {
            console.log("profile id is not defined")
        }
    }

    async findProfile(collectionName, searchValue, searchData) {

        let data = await findCollection(collectionName, searchValue,"==", searchData);
        if (!data || data.length === 0) {
            return;
        }

        if (data.length === 1) {
            this.props.ADD_PROFILE(data[0]);
            await this.findContractById("tenantProfileId", data[0].id);
            await this.findContractById("landlordProfileId", data[0].id);
            await this.findContractById("creatorProfileId", data[0].id);
        } else {
            this.props.ADD_PROFILES_LIST(data);
        }
    }

    cleanSearchBar() {
        this.setState({
            searchData: ''
        })
    }


    async search(key, searchData) {
        if (key === 'Enter') {

            this.props.ADD_SEACRH(this.state.searchData);
            this.props.CLEAR_PROFILE_DATA();
            this.props.CLEAR_PROFILES_LIST();
            this.props.CLOSE_OPEN_AGREEMENTS();
            this.props.CLEAN_ALL_AGREEMENTS_FROM_AGREEMENTS_LIST();
            this.props.CLEAR_TASKS_FROM_LIST();
            this.props.CLOSE_TASK_PAGE();
            this.props.REMOVE_CLIENTS_FROM_LIST();
            this.props.CLOSE_ALL_CLIENTS_PAGE();


            if (!searchData)
                return;

            //first of all try to find by "Q-code"
            if (searchData.startsWith("Q-")) {
                this.findProfile('profiles', "userProfileId", searchData);
                this.cleanSearchBar();
                return;
            }

            const validator = require("email-validator");

            //find by email
            if (validator.validate(searchData)) {
                this.findProfile('profiles', "email", searchData);
                this.cleanSearchBar();
                return;
            }

            //if search value is only a number (expect that it is user personal code)
            if (isNumber(searchData)) {
                //try by personal id code
                await this.findProfile('profiles', "personalIdCode", searchData);
                //try find by mobile phone
                if (!this.props.profile) {
                    await this.findProfile('profiles', "phoneNumber", searchData);
                }
                this.cleanSearchBar();
                return;
            }

            const agreement = await findCollection('agreements', 'agreementId',"==", searchData);
            if (!agreement || agreement.length === 0 || agreement[0].hasOwnProperty('kv24Id')) {
                return;
            } else {
                this.props.ADD_AGREEMENT_TO_OPEN_LIST(agreement[0]);
            }

            this.props.CLEAR_PROFILE_DATA();
            this.cleanSearchBar();


        }


    }

    render() {
        return (
            <div>
                <div className="input-group mb-2">
                    <div className="input-group-prepend">
                        <div className="input-group-text bg-white text-dark border-white">Searching
                        </div>
                    </div>
                    <input className="form-control" value={this.state.searchData}
                           size="lg"
                           onChange={this.handleChange}
                           type="text" name="searchData"
                           placeholder={Translations.SEARCH_BAR_PLACEHOLDER}
                           onKeyPress={(event) => this.search(event.key, this.state.searchData)}
                    />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        profile: state.selectedProfile,
        foundProfilesList: state.foundProfilesList,
        openContractsList: state.openContractsList,
        agreementItemsList: state.agreementItemsList,
        tasksList: state.tasksList,
        search: state.search
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        ADD_PROFILE: ADD_PROFILE_DATA,
        CLEAR_PROFILE_DATA: CLEAR_PROFILE_DATA,
        ADD_PROFILES_LIST: ADD_PROFILES_LIST,
        CLEAR_PROFILES_LIST: CLEAR_PROFILES_LIST,
        CLOSE_OPEN_AGREEMENTS: clearAllAgreementFromOpenList,
        ADD_AGREEMENTS_TO_TENANT_LIST: ADD_AGREEMENTS_TO_TENANT_LIST,
        ADD_AGREEMENTS_TO_LANDLORD_LIST: ADD_AGREEMENTS_TO_LANDLORD_LIST,
        ADD_AGREEMENTS_TO_CREATOR_LIST: ADD_AGREEMENTS_TO_CREATOR_LIST,
        CLEAN_ALL_AGREEMENTS_FROM_AGREEMENTS_LIST: CLEAN_ALL_AGREEMENTS_FROM_AGREEMENTS_LIST,
        CLEAR_TASKS_FROM_LIST: CLEAR_TASKS_FROM_LIST,
        ADD_SEACRH: ADD_SEACRH,
        CLEAN_SEARCH: CLEAN_SEARCH,
        CLOSE_TASK_PAGE: CLOSE_TASK_PAGE,
        ADD_AGREEMENT_TO_OPEN_LIST: ADD_AGREEMENT_TO_OPEN_LIST,
        REMOVE_CLIENTS_FROM_LIST: REMOVE_CLIENTS_FROM_LIST,
        CLOSE_ALL_CLIENTS_PAGE: CLOSE_ALL_CLIENTS_PAGE


    }, dispatch)
}


export default connect(mapStateToProps, matchDispatchToProps)(Search);