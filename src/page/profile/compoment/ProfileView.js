import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {
    ADD_AGREEMENTS_TO_CREATOR_LIST,
    ADD_AGREEMENTS_TO_LANDLORD_LIST,
    ADD_AGREEMENTS_TO_TENANT_LIST,
    ADD_PROFILE_DATA,
    ADD_SEACRH,
    CLEAR_PROFILE_DATA,
    CLEAR_PROFILES_LIST,
    CLEAR_TASKS_FROM_LIST,
    clearAllAgreementFromOpenList
} from "../../../actions";
import {connect} from "react-redux";
import AgreementsTable from "./AgreementsTable";
import Profile from "./Person";
import Agreements from "./Agreements";

class ProfileView extends Component {
    render() {
        return (
            <>

                <div className="px-5 pt-5">
                    {(this.props.profile) &&
                    <div className="row justify-content-lg-center mx-auto">
                        <div className="col-lg-5"><AgreementsTable open={this.props.openContractsList.length < 1}/>
                        </div>
                        <div className="col-lg-6"><Profile metadata={this.props.profile} isInContract={true}
                                                           open={this.props.openContractsList.length < 1}/></div>
                    </div>
                    }
                    <div className="row justify-content-lg-center mx-auto">
                        <div className="col-lg-11"><Agreements/></div>
                    </div>
                </div>
            </>
        );
    }

}


function mapStateToProps(state) {
    return {
        foundProfilesList: state.foundProfilesList,
        openContractsList: state.openContractsList,
        profile: state.selectedProfile
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        CLEAR_PROFILE_DATA: CLEAR_PROFILE_DATA,
        CLEAR_PROFILES_LIST: CLEAR_PROFILES_LIST,
        ADD_AGREEMENTS_TO_TENANT_LIST: ADD_AGREEMENTS_TO_TENANT_LIST,
        ADD_AGREEMENTS_TO_LANDLORD_LIST: ADD_AGREEMENTS_TO_LANDLORD_LIST,
        ADD_AGREEMENTS_TO_CREATOR_LIST: ADD_AGREEMENTS_TO_CREATOR_LIST,
        CLEAR_TASKS_FROM_LIST: CLEAR_TASKS_FROM_LIST,
        CLOSE_OPEN_AGREEMENTS: clearAllAgreementFromOpenList,
        ADD_PROFILE: ADD_PROFILE_DATA,
        ADD_SEACRH: ADD_SEACRH,

    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(ProfileView);